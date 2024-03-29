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
	peerConnection: RTCPeerConnection | null;
	socket: WebSocket;

	constructor(localVideoElement: HTMLVideoElement, remoteVideoElement: HTMLVideoElement) {
		this.localVideoElement = localVideoElement;
		this.remoteVideoElement = remoteVideoElement;
		this.localStream = null;
		this.remoteStream = null;
		this.peerConnection = null;
		this.socket = new WebSocket("wss://localhost:8080"); // Thay đổi URL WebSocket tùy theo cấu hình máy chủ của bạn

		this.socket.onopen = () => {
			console.log("Connected to WebSocket server");
		};

		this.socket.onclose = () => {
			console.log("Disconnected from WebSocket server");
		};

		this.socket.onmessage = (event: any) => {
			const data: RTCMessage = JSON.parse(event.data);
			const { offer, answer, candidate } = data;

			if (offer) {
				this.handleOffer(offer);
			}

			if (answer) {
				this.handleAnswer(answer);
			}

			if (candidate) {
				this.handleIceCandidate(candidate);
			}
		};
	}

	async start(): Promise<void> {
		try {
			this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			this.localVideoElement.srcObject = this.localStream;
			this.peerConnection = new RTCPeerConnection();
			this.localStream
				.getTracks()
				.forEach(
					(track) => this.localStream && this.peerConnection!.addTrack(track, this.localStream)
				);

			this.peerConnection.ontrack = (event) => {
				this.remoteStream = event.streams[0];
				this.remoteVideoElement.srcObject = this.remoteStream;
			};

			this.peerConnection.onicecandidate = (event) => {
				if (event.candidate) {
					this.sendIceCandidate(event.candidate);
				}
			};

			const offer = await this.peerConnection.createOffer();
			await this.peerConnection.setLocalDescription(offer);
			this.sendOffer(offer);
		} catch (error) {
			console.error("Error starting WebRTC:", error);
		}
	}

	async handleOffer(offer: RTCSessionDescriptionInit): Promise<void> {
		try {
			this.peerConnection = new RTCPeerConnection();
			this.peerConnection.ontrack = (event) => {
				this.remoteStream = event.streams[0];
				this.remoteVideoElement.srcObject = this.remoteStream;
			};

			this.peerConnection.onicecandidate = (event) => {
				if (event.candidate) {
					this.sendIceCandidate(event.candidate);
				}
			};

			await this.peerConnection.setRemoteDescription(offer);
			const answer = await this.peerConnection.createAnswer();
			await this.peerConnection.setLocalDescription(answer);
			this.sendAnswer(answer);
		} catch (error) {
			console.error("Error accepting offer:", error);
		}
	}

	async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
		try {
			await this.peerConnection!.setRemoteDescription(answer);
		} catch (error) {
			console.error("Error setting remote description:", error);
		}
	}

	async handleIceCandidate(candidate: RTCIceCandidate): Promise<void> {
		try {
			if (this.peerConnection) {
				await this.peerConnection.addIceCandidate(candidate);
			}
		} catch (error) {
			console.error("Error adding ICE candidate:", error);
		}
	}

	sendOffer(offer: RTCSessionDescriptionInit): void {
		this.socket.send(JSON.stringify({ offer }));
	}

	sendAnswer(answer: RTCSessionDescriptionInit): void {
		this.socket.send(JSON.stringify({ answer }));
	}

	sendIceCandidate(candidate: RTCIceCandidate): void {
		this.socket.send(JSON.stringify({ candidate }));
	}

	hangUp(): void {
		if (this.peerConnection) {
			this.peerConnection.close();
			this.peerConnection = null;
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

export default WebRTCVideoCall;
