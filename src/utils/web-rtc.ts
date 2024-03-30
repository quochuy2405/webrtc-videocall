import { child, get, onValue, ref, set } from "firebase/database";
import { database } from "./firebase";
const servers = {
	iceServers: [
		{ urls: "stun:stun.services.mozilla.com" },

		{ urls: "stun:stun.l.google.com:19302" },
	],
};

interface RTCMessage {
	from: string;
	to?: string;
	offer?: RTCSessionDescriptionInit;
	answer?: RTCSessionDescriptionInit;
	candidate?: RTCIceCandidate;
}

export class WebRTCVideoCall {
	localVideoElement: HTMLVideoElement;
	remoteVideoElement: HTMLVideoElement;
	localStream: MediaStream | null;
	remoteStream: MediaStream | null;
	localPeerConnection: RTCPeerConnection | null;
	remotePeerConnection: RTCPeerConnection | null;
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
		this.remoteStream = null;
		this.localPeerConnection = null;
		this.remotePeerConnection = null;
	}

	async start(): Promise<void> {
		try {
			this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			this.localVideoElement.srcObject = this.localStream;

			this.localPeerConnection = new RTCPeerConnection();
			this.localStream.getTracks().forEach((track) => {
				this.localStream && this.localPeerConnection!.addTrack(track, this.localStream);
			});

			this.localPeerConnection.ontrack = (event) => {
				this.remoteStream = event.streams[0];
				this.remoteVideoElement.srcObject = this.remoteStream;
			};

			this.localPeerConnection.onicecandidate = (event) => {
				if (event.candidate) {
					this.sendIceCandidate(event.candidate);
				}
			};

			const offer = await this.localPeerConnection.createOffer();
			await this.localPeerConnection.setLocalDescription(offer);
			this.sendOffer(offer);

			const dbOfferRef = ref(database, `offer`);
			const dbAnswerRef = ref(database, `answer`);
			const dbCandidaterRef = ref(database, `candidate`);
			onValue(dbOfferRef, (snapshot) => {
				if (snapshot.exists()) {
					Object.entries(snapshot.val()).forEach(([key, value]: any) => {
						if (key !== this.userId) {
							this.handleOffer(JSON.parse(value));
						}
					});
				} else {
					console.log("No data available");
				}
			});

			onValue(dbCandidaterRef, (snapshot) => {
				if (snapshot.exists()) {
					Object.entries(snapshot.val()).forEach(([key, value]: any) => {
						if (key !== this.userId) {
							this.handleIceCandidate(JSON.parse(value));
						}
					});
				} else {
					console.log("No data available");
				}
			});

			onValue(dbAnswerRef, (snapshot) => {
				if (snapshot.exists()) {
					Object.entries(snapshot.val()).forEach(([key, value]: any) => {
						if (key !== this.userId) {
							this.handleAnswer(JSON.parse(value));
						}
					});
					console.log();
				} else {
					console.log("No data available");
				}
			});
		} catch (error) {
			console.error("Error starting WebRTC:", error);
		}
	}

	async handleOffer(offer: RTCSessionDescriptionInit): Promise<void> {
		try {
			this.remotePeerConnection = new RTCPeerConnection();
			this.remotePeerConnection.ontrack = (event) => {
				this.remoteStream = event.streams[0];
				this.remoteVideoElement.srcObject = this.remoteStream;
			};
			await this.remotePeerConnection.setRemoteDescription(offer);
			const answer = await this.remotePeerConnection.createAnswer();
			await this.remotePeerConnection.setLocalDescription(answer);
			this.sendAnswer(answer);
		} catch (error) {
			console.error("Error accepting offer:", error);
		}
	}
	async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
		try {
			console.log("answer", answer);
			await this.localPeerConnection!.setRemoteDescription(answer);
		} catch (error) {
			console.error("Error setting remote description:", error);
		}
	}

	async handleIceCandidate(candidate: RTCIceCandidate): Promise<void> {
		try {
			if (this.remotePeerConnection) {
				await this.remotePeerConnection.addIceCandidate(candidate);
			}
		} catch (error) {
			console.error("Error adding ICE candidate:", error);
		}
	}

	sendOffer(offer: RTCSessionDescriptionInit): void {
		try {
			set(ref(database, "offer/" + this.userId), JSON.stringify(offer));
		} catch (error) {
			console.error("Error sending offer:", error);
		}
	}

	sendAnswer(answer: RTCSessionDescriptionInit): void {
		try {
			set(ref(database, "answer/" + this.userId), JSON.stringify(answer));
		} catch (error) {
			console.error("Error sending answer:", error);
		}
	}

	sendIceCandidate(candidate: RTCIceCandidate): void {
		try {
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
		if (this.remotePeerConnection) {
			this.remotePeerConnection.close();
			this.remotePeerConnection = null;
		}
		if (this.localStream) {
			this.localStream.getTracks().forEach((track) => track.stop());
			this.localStream = null;
		}
		if (this.remoteStream) {
			this.remoteStream.getTracks().forEach((track) => track.stop());
			this.remoteStream = null;
		}
		this.localVideoElement.srcObject = null;
		this.remoteVideoElement.srcObject = null;
	}
}
