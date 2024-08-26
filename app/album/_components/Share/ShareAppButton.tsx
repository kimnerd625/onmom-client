import Image from "next/image";

import type { AppList } from "../Types/AppList";

export default function ShareAppButton({ imageUrl, appName }: AppList) {
  return (
    <button className="flex flex-col justify-center items-center hover:outline p-1 hover:outline-blue-300">
      <Image
        src={`${imageUrl}`}
        alt={`${appName} 아이콘 이미지`}
        width={40}
        height={40}
      />
      <div className="text-xs mt-1">{appName}</div>
    </button>
  );
}
