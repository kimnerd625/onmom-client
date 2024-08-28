"use client";

import React, { useEffect, useRef } from "react";

interface VisualizerCanvasProps {
  isRecording: boolean;
  analyser: AnalyserNode | null;
  imageUrl: string; // 하트 이미지의 URL을 props로 전달
}

const VisualizerCanvas = ({
  isRecording,
  analyser,
  imageUrl,
}: VisualizerCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isRecording || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const draw = () => {
        if (!ctx || !canvas) return;

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;

        // 그라디언트 생성
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius
        );
        gradient.addColorStop(0, "rgba(255, 123, 0, 1)"); // 중심은 진한 색
        gradient.addColorStop(1, "rgba(255, 123, 0, 0)"); // 바깥쪽은 투명

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = gradient; // 그라디언트를 채우기 스타일로 사용
        ctx.fill();

        // 하트 이미지 그리기
        const imgSize = 150; // 하트 이미지의 크기
        ctx.drawImage(
          image,
          centerX - imgSize / 2,
          centerY - imgSize / 2,
          imgSize,
          imgSize
        );

        // 시각화 데이터 그리기
        dataArray.forEach((value, index) => {
          const angle = (index / dataArray.length) * 2 * Math.PI;
          const x = centerX + Math.cos(angle) * (radius + value * 0.5);
          const y = centerY + Math.sin(angle) * (radius + value * 0.5);

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255, 123, 0, 1)`;
          ctx.fill();
        });

        requestAnimationFrame(draw);
      };

      draw();
    };
  }, [isRecording, analyser, imageUrl]);

  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <canvas ref={canvasRef} width={400} height={400} className="z-0"></canvas>
    </div>
  );
};

export default VisualizerCanvas;
