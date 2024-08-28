"use client";

import React, { useEffect, useRef } from "react";

interface VisualizerCanvasProps {
  isRecording: boolean;
  analyser: AnalyserNode | null;
}

const VisualizerCanvas = ({ isRecording, analyser }: VisualizerCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isRecording || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      if (!ctx || !canvas) return;

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 100;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(34, 197, 94, 0.2)";
      ctx.fill();

      dataArray.forEach((value, index) => {
        const angle = (index / dataArray.length) * 2 * Math.PI;
        const x = centerX + Math.cos(angle) * (radius + value * 0.5);
        const y = centerY + Math.sin(angle) * (radius + value * 0.5);

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(34, 197, 94, ${value / 255})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [isRecording, analyser]);

  return (
    <canvas ref={canvasRef} width={400} height={400} className="z-0"></canvas>
  );
};

export default VisualizerCanvas;
