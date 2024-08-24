import Image from "next/image";
import CloseIcon from "@/public/icons/icon-close.svg";
import SendIcon from "@/public/icons/icon-share-black.svg";

export default function Share() {
  return (
    <div className="absolute z-50 w-full bottom-0 flex flex-col h-2/3">
      <div className="flex justify-end">
        <button className="hover:bg-opacity-80 flex justify-center items-center rounded-full bg-white w-7 h-7 m-3">
          <CloseIcon></CloseIcon>
        </button>
      </div>
      <div className="bg-white w-full h-full p-6 rounded-t-[20px] shadow-inner">
        <div className="flex justify-center">
          <div className="font-bold">공유하기</div>
        </div>

        <div className="flex justify-between py-5">
          <button className="flex flex-col justify-center items-center hover:outline hover:outline-blue-300">
            <Image
              src="/images/message.png"
              alt="메시지 아이콘 이미지"
              width={40}
              height={40}
            />
            <div className="text-xs mt-1">Message</div>
          </button>
          <button className="flex flex-col justify-center items-center hover:outline hover:outline-blue-300">
            <Image
              src="/images/instagram.png"
              alt="인스타그램 아이콘 이미지"
              width={40}
              height={40}
            />
            <div className="text-xs mt-1">Instagram</div>
          </button>
          <button className="flex flex-col justify-center items-center hover:outline hover:outline-blue-300">
            <Image
              src="/images/email.png"
              alt="이메일 아이콘 이미지"
              width={40}
              height={40}
            />
            <div className="text-xs mt-1">Mail</div>
          </button>
          <button className="flex flex-col justify-center items-center hover:outline hover:outline-blue-300">
            <Image
              src="/images/add-link.png"
              alt="링크 추가 아이콘 이미지"
              width={40}
              height={40}
            />
            <div className="text-xs mt-1">Copy link</div>
          </button>
          <button className="flex flex-col justify-center items-center hover:outline hover:outline-blue-300">
            <Image
              src="/images/more.png"
              alt="더보기 아이콘 이미지"
              width={40}
              height={40}
            />
            <div className="text-xs mt-1">More apps</div>
          </button>
        </div>

        <div className="flex flex-col border-t">
          <div className="flex items-center">
            <div className="flex-0 pr-3">
              <Image
                src="/images/profile-img1.png"
                alt="예시 프로필 이미지1"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col flex-1 py-4">
              <div>큰 딸</div>
              <div className="text-xs text-[#B5B5B5]">김윤서</div>
            </div>
            <button className="p-3 flex-2 hover:bg-black hover:bg-opacity-5 rounded-full">
              <SendIcon width={23} height={23}></SendIcon>
            </button>
          </div>
          <div className="flex">
            <div className="flex-0 pr-3">
              <Image
                src="/images/profile-img2.png"
                alt="예시 프로필 이미지2"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col flex-1">
              <div>작은 딸</div>
              <div className="text-xs  text-[#B5B5B5]">나혜원</div>
            </div>
            <button className="p-3 flex-2 hover:bg-black hover:bg-opacity-5 rounded-full">
              <SendIcon width={23} height={23}></SendIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
