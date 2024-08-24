import ShareIcon from "@/public/icons/icon-share-white.svg";

export default function Diary() {
  return (
    <div className="flex relative">
      <div className="z-30 relative">
        <div className="z-30 rounded-full p-2.5 top-3 right-3 absolute hover:bg-brand-main_200 cursor-pointer">
          <ShareIcon width={24} height={24}></ShareIcon>
        </div>
        <div className="ml-1 cursor-pointer group hover:outline hover:outline-blue-600 flex justify-center flex-col items-center relative w-[313px] h-[512px] rounded-[38px] bg-album-first">
          <div>
            <div className="flex flex-col items-center justify-center w-[250px] h-[360px] bg-gray-400">
              <div className="w-[240px] h-[260px] bg-slate-200"></div>
              <div className="w-[240px] h-[40px] bg-slate-100">#가족 #여행</div>
            </div>
          </div>
          <div>
            <div className="group:hover:border group-hover:outline group-hover:border-l-2 group-hover:border-r-2 group-hover:border-t-2 group-hover:outline-white group-hover:border-r-blue-600 group-hover:border-t-blue-600 group-hover:border-l-blue-600 absolute bottom-0 left-[125px] bg-white w-[67px] h-[33.5px] rounded-t-full"></div>
          </div>
        </div>
      </div>

      <div className="drop-shadow-xl absolute z-20 origin-bottom-right rotate-[10deg]">
        <div className="cursor-pointer group hover:outline hover:outline-blue-600 flex justify-center flex-col items-center relative w-[313px] h-[512px] rounded-[38px] bg-album-second"></div>
      </div>
      <div className="drop-shadow-[4px_-4px_8px_rgba(0,0,0,0.3)] absolute z-10 right-20 top-5 origin-bottom-right rotate-[35deg]">
        <div className="cursor-pointer group hover:outline hover:outline-blue-600 flex justify-center flex-col items-center relative w-[290px] h-[400px] rounded-[38px] bg-album-third"></div>
      </div>
    </div>
  );
}
