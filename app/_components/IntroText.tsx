"use client"; // 클라이언트 컴포넌트로 선언

import { useEffect, useRef } from "react";
import { gsap } from "gsap"; // GSAP 가져오기

// Card Component (기능 설명 카드 예시)
const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="px-6 py-4 rounded-xl shadow-md bg-white">
      <h3 className="font-semibold text-slate-900 text-lg mb-2 tracking-tight leading-snug">
        {title}
      </h3>
      <p className="text-sm text-slate-700 tracking-tight leading-snug">
        {description}
      </p>
    </div>
  );
};

const IntroText = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null); // h2 태그를 참조할 Ref 생성
  const additionalTextRef = useRef<HTMLDivElement | null>(null); // 추가 텍스트를 참조할 Ref 생성
  const cardsRef = useRef<HTMLDivElement | null>(null); // 카드 컴포넌트를 참조할 Ref 생성
  const hasAnimated = useRef<boolean>(false); // 애니메이션 실행 여부를 추적할 Ref 생성

  // 애니메이션 실행
  useEffect(() => {
    // 애니메이션이 이미 실행되었다면 다시 실행하지 않음
    if (hasAnimated.current) return;

    const tl = gsap.timeline();

    // 첫 번째 애니메이션 (h2 태그)
    if (headingRef.current) {
      tl.from(headingRef.current.children as HTMLCollection, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out",
      });
    }

    // 추가 텍스트 애니메이션 (왼쪽에서 오른쪽으로 슬라이드)
    if (additionalTextRef.current) {
      tl.from(additionalTextRef.current, {
        opacity: 0,
        x: -100, // 왼쪽에서 시작
        duration: 1,
        ease: "power2.out",
      });
    }

    // 카드 컴포넌트 애니메이션 (위에서 아래로 슬라이드)
    if (cardsRef.current) {
      tl.from(cardsRef.current.children as HTMLCollection, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      });
    }

    hasAnimated.current = true; // 애니메이션이 실행되었음을 표시
  }, []);

  return (
    <div className="absolute top-16 left-12 z-10">
      <h2
        ref={headingRef}
        className="text-4xl font-bold text-black space-y-2 leading-snug"
      >
        <span className="text-brand-main_500 text-6xl">온맘</span>
        <br />
        <span className="text-slate-900">독거노인 가족 연결</span>
        <br />
        <span className="text-slate-900">AI 그림일기 서비스</span>
      </h2>

      {/* 추가 텍스트 */}
      <div
        ref={additionalTextRef}
        className="mt-8 text-base font-semibold text-gray-800 tracking-tight leading-5"
      >
        <span>가족이 있어도 여전히 외로운 어르신들</span>
        <br />
        <span>온맘이 따뜻한 연결고리를 만들어 줍니다.</span>
      </div>

      {/* 기능 설명 카드 */}
      <div ref={cardsRef} className="mt-8 grid grid-cols-1 gap-4">
        <FeatureCard
          title="독거노인의 하루를 담은 AI 그림일기 생성"
          description="AI가 어르신의 목소리에 귀 기울여 그들의 하루를 정성껏 담아요."
        />
        <FeatureCard
          title="보호자에게 그림일기 공유"
          description="그림일기로 일상을 공유하며, 가족 간 연결을 강화해요."
        />
        <FeatureCard
          title="어르신 복약 정보 등록 및 확인"
          description="부모님의 건강 진단 및 복약 여부 등의 건강 관련 정보를 추적할 수 있어요."
        />
      </div>
    </div>
  );
};

export default IntroText;
