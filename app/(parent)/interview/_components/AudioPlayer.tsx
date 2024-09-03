import React from "react";

interface AudioPlayerProps {
  audioUrl: string | null;
}

const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  if (!audioUrl) return null;

  return (
    <div className="z-10 relative w-full">
      <audio src={audioUrl} controls className="w-full" />
      <p className="text-white">Audio Player is rendered</p>
    </div>
  );
};

export default AudioPlayer;
