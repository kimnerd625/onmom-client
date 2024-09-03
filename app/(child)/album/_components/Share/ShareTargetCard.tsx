import Image from "next/image";

import SendIcon from "@/public/icons/icon-share-black.svg";

interface ShareTargetCardProps {
  imageUrl: string;
  nickName: string;
  targetName: string;
}

export default function ShareTargetCard({
  imageUrl,
  nickName,
  targetName,
}: ShareTargetCardProps) {
  return (
    <div className="flex items-center hover:bg-black hover:bg-opacity-5 pl-2">
      <div className="flex-0 pr-3">
        <Image src={imageUrl} alt="공유 대상 이미지" width={40} height={40} />
      </div>
      <div className="flex flex-col flex-1 py-4">
        <div>{nickName}</div>
        <div className="text-xs text-[#B5B5B5]">{targetName}</div>
      </div>
      <button className="p-3 flex-2 hover:bg-black hover:bg-opacity-5 rounded-full">
        <SendIcon width={23} height={23}></SendIcon>
      </button>
    </div>
  );
}
