import React, { useRef, useEffect } from "react";
import { WebRTCVideoCall } from "../../utils/web-rtc";

const VideoCallComponent: React.FC = () => {
	const localVideoRef = useRef<HTMLVideoElement | null>(null); // Kiểu dữ liệu là HTMLVideoElement | null
	const remoteVideoRef = useRef<HTMLVideoElement | null>(null); // Kiểu dữ liệu là HTMLVideoElement | null

	useEffect(() => {
		if (localVideoRef.current && remoteVideoRef.current) {
			const webRTCVideoCall = new WebRTCVideoCall(localVideoRef.current, remoteVideoRef.current);
			webRTCVideoCall.start(); // Khởi động cuộc gọi video khi component được render
			return () => {
				webRTCVideoCall.hangUp(); // Kết thúc cuộc gọi video khi component bị unmount
			};
		}
	}, []);

	return (
		<div>
			<video
				style={{ width: "400px", height: "400px" }}
				ref={localVideoRef}
				autoPlay
				muted
				playsInline
			/>
			<video
				style={{ width: "400px", height: "400px" }}
				ref={remoteVideoRef}
				autoPlay
				playsInline
			/>
		</div>
	);
};

export default VideoCallComponent;
