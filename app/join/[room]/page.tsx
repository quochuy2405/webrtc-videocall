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

  useEffect(() => {
    const room = param["room"] as string;
    const id = localStorage.getItem("@id");

    if (id && selfRef.current && room) {
      webRTCVideoCallRef.current = new WebRTCVideoCall(
        id,
        room,
        selfRef.current,
        paticipantsRef.current,
      );
      webRTCVideoCallRef.current.start();
      const dbCandidateRef = ref(database, `rooms/${room}/candidates`);
      const dbAnswerRef = ref(database, `rooms/${room}/answers`);
      onValue(dbCandidateRef, (snapshot) => {
        if (snapshot.exists()) {
          Object.entries(snapshot.val()).forEach(([key, value]: any) => {
            if (key !== id && value) {
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
            if (key !== id && value) {
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
  }, []);
  const handleGetOffer = (room: string, id?: string) => {
    const dbOfferRef = ref(database, `rooms/${room}/offers`);
    onValue(dbOfferRef, (snapshot) => {
      if (snapshot.exists()) {
        Object.entries(snapshot.val()).forEach(([key, value]: any) => {
          if (key !== id) {
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
