import { ref, set } from "firebase/database";
import { database } from "./firebase";

export class WebRTCVideoCall {
	localVideoElement: HTMLVideoElement;
	remoteVideoElement: HTMLVideoElement;
	localStream: MediaStream | null;
	localPeerConnection: RTCPeerConnection | null;
	userId: string | null;

	constructor(
		userId: string,
		localVideoElement: HTMLVideoElement,
		remoteVideoElement: HTMLVideoElement
	) {
		this.localVideoElement = localVideoElement;
		this.remoteVideoElement = remoteVideoElement;
		this.userId = userId;
		this.localStream = null;
		this.localPeerConnection = null;
	}

	async start(): Promise<void> {
		try {
			this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			this.localVideoElement.srcObject = this.localStream;

			this.localPeerConnection = new RTCPeerConnection();
			this.localStream.getTracks().forEach((track) => {
				this.localPeerConnection!.addTrack(track, this.localStream!);
			});

			this.localPeerConnection.ontrack = (event) => {
				console.log("event", event);
				this.remoteVideoElement.srcObject = event.streams[0];
			};

			this.localPeerConnection.onicecandidate = (event) => {
				if (event.candidate) {
					this.sendIceCandidate(event.candidate);
				}
			};
			this.localPeerConnection.onnegotiationneeded = async () => {
				const offer = await this.localPeerConnection!.createOffer();
				await this.localPeerConnection!.setLocalDescription(offer);
				this.sendOffer(offer);
			};
		} catch (error) {
			console.error("Error starting WebRTC:", error);
		}
	}

	async handleOffer(offer: RTCSessionDescriptionInit): Promise<void> {
		try {
			await this.localPeerConnection!.setRemoteDescription(offer);
			const answer = await this.localPeerConnection!.createAnswer();
			await this.localPeerConnection!.setLocalDescription(answer);
			this.sendAnswer(answer);
			// console.log("answer được gửi đi ");
		} catch (error) {
			console.error("Error handling offer:", error);
		}
	}
	async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
		try {
			// console.log("Nhận được answer");
			await this.localPeerConnection!.setRemoteDescription(answer);
		} catch (error) {
			console.error("Error setting remote description:", error);
		}
	}
	async startScreenSharing() {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: true, // Share screen with video
				audio: true, // Share screen with audio (optional)
			});
			this.localStream = stream;
			this.localStream.getTracks().forEach((track) => {
				if (this.localPeerConnection) {
					this.localPeerConnection.addTrack(track, this.localStream!);
				}
			});
		} catch (error) {
			console.error("Error starting screen sharing:", error);
		}
	}
	async handleIceCandidate(candidate: RTCIceCandidate): Promise<void> {
		try {
			// console.log("Nhận được candidate");
			await this.localPeerConnection!.addIceCandidate(candidate);
		} catch (error) {
			console.error("Error adding ICE candidate:", error);
		}
	}

	sendOffer(offer: RTCSessionDescriptionInit): void {
		try {
			// console.log("gửi offer đi", offer);
			set(ref(database, "offer/" + this.userId), JSON.stringify(offer));
		} catch (error) {
			console.error("Error sending offer:", error);
		}
	}

	sendAnswer(answer: RTCSessionDescriptionInit): void {
		try {
			// console.log("gửi answer đi", answer);
			set(ref(database, "answer/" + this.userId), JSON.stringify(answer));
		} catch (error) {
			console.error("Error sending answer:", error);
		}
	}

	sendIceCandidate(candidate: RTCIceCandidate): void {
		try {
			// console.log("gửi candidate đi", candidate);
			set(ref(database, "candidate/" + this.userId), JSON.stringify(candidate));
		} catch (error) {
			console.error("Error sending ICE candidate:", error);
		}
	}

	hangUp(): void {
		if (this.localPeerConnection) {
			this.localPeerConnection.close();
			this.localPeerConnection = null;
		}
		if (this.localStream) {
			this.localStream.getTracks().forEach((track) => track.stop());
			this.localStream = null;
		}
		this.localVideoElement.srcObject = null;
		this.remoteVideoElement.srcObject = null;
	}
}
