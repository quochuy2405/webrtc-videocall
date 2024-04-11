"use client";
import { ContentHeader, VideoContent } from "@/components/moleculers";
import { database } from "@/modules/firebase";
import { WebRTCVideoCall } from "@/modules/web-rtc";
import { onValue, ref } from "firebase/database";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const Page = () => {
  const webRTCVideoCallRef = useRef<WebRTCVideoCall | null>(null);
  const param = useParams();
  const paticipantsRef = useRef<HTMLVideoElement[]>([]);
  const selfRef = useRef<HTMLVideoElement | null>(null);
  const connect = useRef(false);

  useEffect(() => {
    const room = param["room"] as string;
    const id = localStorage.getItem("@id");

    if (id && !connect.current && selfRef.current && room) {
      webRTCVideoCallRef.current = new WebRTCVideoCall(
        id,
        room,
        selfRef.current,
        paticipantsRef.current[0],
      );
      webRTCVideoCallRef.current.start();
      const dbCandidateRef = ref(database, `rooms/${room}/candidate`);
      const dbAnswerRef = ref(database, `rooms/${room}/answer`);

      onValue(dbCandidateRef, (snapshot) => {
        if (snapshot.exists()) {
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
            const isOwner = id.includes("-owner");
            if (isOwner && key.includes("-paticipant")) {
              webRTCVideoCallRef.current!.handleAnswer(JSON.parse(value));
            }
          });
        } else {
          console.log("No candidate available");
        }
      });
    }
  }, [param]);
  useEffect(() => {
    setTimeout(() => {
      const room = param["room"] as string;
      const id = localStorage.getItem("@id") as string;
      handleGetOffer(room, id);
    }, 2000);
    return () => {
      webRTCVideoCallRef.current?.hangUp();
    };
  }, []);
  const handleGetOffer = (room: string, id?: string) => {
    const dbOfferRef = ref(database, `rooms/${room}/offer`);
    onValue(dbOfferRef, (snapshot) => {
      if (snapshot.exists()) {
        Object.entries(snapshot.val()).forEach(([key, value]: any) => {
          const isOwner = id?.includes("-owner");
          if (!isOwner && key.includes("-owner")) {
            webRTCVideoCallRef.current?.handleOffer(JSON.parse(value));
          }
        });
      } else {
        console.log("No offer available");
      }
    });
  };

  return (
    <div className="flex h-screen w-full flex-col gap-2 p-2 ">
      <ContentHeader />
      <VideoContent paticipants={paticipantsRef} self={selfRef} />
    </div>
  );
};

export default Page;
