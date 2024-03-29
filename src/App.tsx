import React, { useRef, useEffect } from "react";
import WebRTCVideoCall from "./utils/web-rtc";

const VideoCallComponent: React.FC = () => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const webRTCVideoCallRef = useRef<WebRTCVideoCall | null>(null);

	useEffect(() => {
		// Khởi tạo đối tượng WebRTCVideoCall khi component được mount
		if (localVideoRef.current && remoteVideoRef.current) {
			webRTCVideoCallRef.current = new WebRTCVideoCall(
				localVideoRef.current,
				remoteVideoRef.current
			);
			webRTCVideoCallRef.current.start();
		}

		// Cleanup khi component bị unmount
		return () => {
			if (webRTCVideoCallRef.current) {
				webRTCVideoCallRef.current.hangUp();
			}
		};
	}, []);

	return (
		<div>
			<h1>WebRTC Video Call</h1>
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
