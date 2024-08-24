export default function Diary() {
  return (
    <div className="hover:outline-slate-500 flex justify-center flex-col items-center relative w-[313px] h-[512px] rounded-[38px] bg-album-main_500">
      <div>
        <div className="flex flex-col items-center justify-center w-[250px] h-[360px] bg-gray-400">
          <div className="w-[240px] h-[260px] bg-slate-200"></div>
          <div className="w-[240px] h-[40px] bg-slate-100">#가족 #여행 </div>
        </div>
      </div>
      <div>
        <div className="absolute bottom-0 left-[125px] bg-white w-[67px] h-[33.5px] rounded-t-full"></div>
      </div>
    </div>
  );
}
