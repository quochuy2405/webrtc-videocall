import { ref, set } from "firebase/database";
import { database } from "./firebase";

export class WebRTCVideoCall {
  localVideoElement: HTMLVideoElement;
  remoteVideoElements?: HTMLVideoElement[];
  localStream: MediaStream | null;
  localPeerConnection: RTCPeerConnection | null;
  userId: string | null;
  roomId: string | null;

  constructor(
    userId: string,
    roomId: string,
    localVideoElement: HTMLVideoElement,
    remoteVideoElements?: HTMLVideoElement[],
  ) {
    this.localVideoElement = localVideoElement;
    this.remoteVideoElements = remoteVideoElements || [];
    this.userId = userId;
    this.roomId = roomId;
    this.localStream = null;
    this.localPeerConnection = null;
  }

  async start(): Promise<void> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      this.localVideoElement.srcObject = this.localStream;

      this.localPeerConnection = new RTCPeerConnection();
      this.localStream.getTracks().forEach((track) => {
        this.localPeerConnection!.addTrack(track, this.localStream!);
      });

      this.localPeerConnection.ontrack = (event) => {
        this.remoteVideoElements?.forEach((element) => {
          element.srcObject = event.streams[0];
        });
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
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  }

  async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    try {
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

  async toggleAudio(): Promise<void> {
    try {
      if (this.localStream) {
        const audioTrack = this.localStream.getAudioTracks()[0];
        if (audioTrack) {
          audioTrack.enabled = !audioTrack.enabled;
        }
      }
    } catch (error) {
      console.error("Error toggling audio:", error);
    }
  }

  async toggleVideo(): Promise<void> {
    try {
      if (this.localStream) {
        const videoTrack = this.localStream.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.enabled = !videoTrack.enabled;
        }
      }
    } catch (error) {
      console.error("Error toggling video:", error);
    }
  }

  async handleIceCandidate(candidate: RTCIceCandidate): Promise<void> {
    try {
      candidate && (await this.localPeerConnection!.addIceCandidate(candidate));
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  }

  sendOffer(offer: RTCSessionDescriptionInit): void {
    try {
      set(
        ref(database, `rooms/${this.roomId}/offers/` + this.userId),
        JSON.stringify(offer),
      );
    } catch (error) {
      console.error("Error sending offer:", error);
    }
  }

  sendAnswer(answer: RTCSessionDescriptionInit): void {
    try {
      set(
        ref(database, `rooms/${this.roomId}/answers/` + this.userId),
        JSON.stringify(answer),
      );
    } catch (error) {
      console.error("Error sending answer:", error);
    }
  }

  sendIceCandidate(candidate: RTCIceCandidate): void {
    try {
      set(
        ref(database, `rooms/${this.roomId}/answers/` + this.userId),
        JSON.stringify(candidate),
      );
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
    this.remoteVideoElements?.forEach((element) => {
      element.srcObject = null;
    });
  }
}
