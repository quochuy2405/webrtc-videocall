"use client";
import { ControlMenu } from "@/components/moleculers";
import { database } from "@/modules/firebase";
import { ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ShortUniqueId from "short-unique-id";

const Waiting = () => {
  const refVideo = useRef<HTMLVideoElement | null>(null);
  const [isCamera, setIsCamera] = useState(true);
  const [isMuteMic, setIsMuteMic] = useState(false);
  const [isMuteSpeaker, setIsMuteSpeaker] = useState(false);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      room: "",
      nickname: "",
    },
  });
  useEffect(() => {
    localStorage.clear();
    const initializeCamera = async () => {
      try {
        const source = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (refVideo.current) refVideo.current.srcObject = source;
        mediaStreamRef.current = source;
      } catch (error) {
        console.log(error);
      }
    };

    initializeCamera();
  }, []);

  const toggleCamera = async () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getVideoTracks();
      tracks.forEach((track) => {
        track.enabled = !isCamera;
      });

      setIsCamera(!isCamera);
    }
  };

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !isMuteMic;
      });
      setIsMuteMic(!isMuteMic);
    }
  };

  const toggleSpeaker = () => {
    setIsMuteSpeaker(!isMuteSpeaker); // Chỉ làm thay đổi trạng thái, không có API để tắt loa trực tiếp trong trình duyệt.
    // Tuy nhiên, bạn có thể tắt loa bằng cách kiểm soát âm lượng của âm thanh hoặc dùng api media session, nhưng chúng không tắt loa mà chỉ giảm âm lượng hoặc tạm dừng phát.
  };

  const onSubmit = ({
    room,
    nickname,
    type,
  }: {
    room: string;
    nickname: string;
    type: "create" | "join";
  }) => {
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const id = randomUUID();
    localStorage.setItem(
      "@id",
      `${id}-${type === "create" ? "owner" : "paticipant"}`,
    );
    set(ref(database, "rooms/" + room + "/user/" + id), nickname).then(() => {
      router.push("/join/" + room);
    });
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 items-center justify-center">
        <form className="flex w-1/2 flex-col gap-4">
          <Controller
            name={"room"}
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="first_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter room id"
                required
              />
            )}
          />

          <Controller
            name={"nickname"}
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter nickname"
                required
              />
            )}
          />

          <button
            onClick={() =>
              form.handleSubmit((data) =>
                onSubmit({ ...data, type: "create" }),
              )()
            }
            type="button"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create room
          </button>
          <button
            type="button"
            onClick={() =>
              form.handleSubmit((data) => onSubmit({ ...data, type: "join" }))()
            }
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Join
          </button>
        </form>
      </div>
      <div className="flex w-1/2 flex-col ">
        <div className="flex flex-1 items-center justify-center">
          <video
            className="h-full w-full bg-black"
            autoPlay
            playsInline
            ref={refVideo}
          />
        </div>
        <div>
          <ControlMenu
            isCamera={isCamera}
            isMuteMic={isMuteMic}
            onToggleCamera={toggleCamera}
            onToggleMic={toggleMic}
            onToggleSpeaker={toggleSpeaker}
          />
        </div>
      </div>
    </div>
  );
};

export default Waiting;
