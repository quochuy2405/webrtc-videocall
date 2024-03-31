import React, { useRef } from "react";
import { WebRTCVideoCall } from "./utils/web-rtc";
import { onValue, ref } from "firebase/database";
import { database } from "./utils/firebase";

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

			const dbCandidateRef = ref(database, `candidate`);
			const dbAnswerRef = ref(database, `answer`);

			onValue(dbCandidateRef, (snapshot) => {
				if (snapshot.exists()) {
					Object.entries(snapshot.val()).forEach(([key, value]: any) => {
						if (key !== id) {
							webRTCVideoCallRef.current!.handleIceCandidate(JSON.parse(value));
						}
					});
				} else {
					console.log("No candidate available");
				}
			});

			onValue(dbAnswerRef, (snapshot) => {
				if (snapshot.exists()) {
					Object.entries(snapshot.val()).forEach(([key, value]: any) => {
						if (key !== id) {
							webRTCVideoCallRef.current!.handleAnswer(JSON.parse(value));
						}
					});
				} else {
					console.log("No candidate available");
				}
			});
		}
	};

	const handleGetOffer = (id: string) => {
		const dbOfferRef = ref(database, `offer/` + id);
		onValue(dbOfferRef, (snapshot) => {
			if (snapshot.exists()) {
				webRTCVideoCallRef.current?.handleOffer(JSON.parse(snapshot.val()));
			} else {
				console.log("No offer available");
			}
		});
	};

	const handleShareScreen = () => {
		webRTCVideoCallRef.current?.startScreenSharing();
	};
	return (
		<div>
			<h1>WebRTC Video Call</h1>
			<button onClick={() => handleSelectUser("0001")}>User1</button>
			<button onClick={() => handleSelectUser("0002")}>User2</button>
			<button onClick={() => handleShareScreen()}>User Share screen</button>
			<button onClick={() => handleGetOffer("0001")}>User 2 Press to Call User 1</button>
			<div style={{ display: "flex", flexDirection: "column" }}>
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
