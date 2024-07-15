import React, { useRef, useState } from "react";
import { WebRTCVideoCall } from "./utils/web-rtc";
import { onValue, ref, set } from "firebase/database";
import { database } from "./utils/firebase";

const VideoCallComponent: React.FC = () => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const webRTCVideoCallRef = useRef<WebRTCVideoCall | null>(null);
	const [state, setState] = useState("");

	const handleSelectUser = (id: string) => {
		setState(id);
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
					console.log("snapshot", snapshot);
					Object.entries(snapshot.val()).forEach(([key, value]: any) => {
						webRTCVideoCallRef.current!.handleIceCandidate(JSON.parse(value));
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
	const handleCreate = (id: string) => {
		setState(id);
		set(ref(database, "/"), null);
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
					console.log("snapshot", snapshot);
					Object.entries(snapshot.val()).forEach(([key, value]: any) => {
						webRTCVideoCallRef.current!.handleIceCandidate(JSON.parse(value));
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

	return (
		<div style={{ height: "100vh", display: "flex", flexDirection: "column", width: "100%" }}>
			<div
				style={{
					display: "flex",
					gap: 10,
					position: "absolute",
					zIndex: 10,
					width: "90%",
					justifyContent: "space-between",
				}}>
				<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
					<button onClick={() => handleCreate("pull")}>
						1. Bật camera điện thoại (điện thoại)
					</button>
					<button onClick={() => handleGetOffer("push")}>
						3. Bắt đầu truyền dữ liệu (điện thoại)
					</button>
				</div>
				<button onClick={() => handleSelectUser("push")}>
					2. Thiết lập kết nối với camera điện thọai (laptop)
				</button>
			</div>
			<div
				style={{
					display: "flex",
					flex: 1,
					flexDirection: "row",
					gap: 10,
					width: "100vw",
					height: "100%",
				}}>
				<video
					style={{
						width: "100%",
						height: "100%",
					}}
					hidden={state === "push" || !state}
					ref={localVideoRef}
					autoPlay
					playsInline
				/>

				<video
					style={{
						width: "100%",
						height: "100%",
					}}
					ref={remoteVideoRef}
					hidden={state === "pull" || !state}
					autoPlay
					playsInline
				/>
			</div>
		</div>
	);
};

export default VideoCallComponent;
