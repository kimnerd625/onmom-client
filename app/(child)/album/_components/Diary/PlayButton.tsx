"use client";

import { useEffect, useRef, useState } from "react";

interface PlayButtonProps {
  audioUrl: string;
  isOpenShare: boolean;
  isSwiping: boolean;
}

export default function PlayButton({
  isSwiping,
  audioUrl,
  isOpenShare,
}: PlayButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    if (audioRef.current) {
      if (isClicked) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsClicked(!isClicked);
    }
  };

  useEffect(() => {
    if (isOpenShare === true || isSwiping === true) {
      audioRef.current?.pause();
      setIsClicked(false);
    }
  }, [isOpenShare, isSwiping]);

  return (
    <div className="flex relative justify-center w-14 h-14 rounded-full bg-black">
      <audio ref={audioRef} style={{ display: "none" }} controls>
        <source
          src="https://onmom-files.s3.ap-northeast-2.amazonaws.com/audio/3/1724767433378.mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className="absolute"></div>
      <button
        onClick={handleClick}
        className="flex items-center justify-center cursor-pointer"
      >
        {isClicked ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 19h2V5H6zm10-14h2v14h-2z"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-8 h-8 pl-1 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3l14 9-14 9V3z"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
}
