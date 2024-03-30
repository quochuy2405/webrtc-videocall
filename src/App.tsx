import React, { useRef } from "react";
import { WebRTCVideoCall } from "./utils/web-rtc";

const VideoCallComponent: React.FC = () => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const webRTCVideoCallRef = useRef<WebRTCVideoCall | null>(null);

	const handleSelectUser = (id: string) => {
		if (localVideoRef.current && remoteVideoRef.current) {
			webRTCVideoCallRef.current = new WebRTCVideoCall(
				id,
				localVideoRef.current,
				remoteVideoRef.current
			);
			webRTCVideoCallRef.current.start();
		}
	};

	return (
		<div>
			<h1>WebRTC Video Call</h1>
			<button onClick={() => handleSelectUser("0001")}>User1</button>
			<button onClick={() => handleSelectUser("0002")}>User2</button>
			<div>
				<video
					style={{ width: "400px", height: "400px" }}
					ref={localVideoRef}
					autoPlay
					playsInline
					muted
				/>
				<video
					style={{ width: "400px", height: "400px" }}
					ref={remoteVideoRef}
					autoPlay
					playsInline
				/>
			</div>
		</div>
	);
};

export default VideoCallComponent;
