import Diary from "./_components/Diary";
import Dimmed from "./_components/Dimmed";
import Share from "./_components/Share";

export default function AlbumPage() {
  return (
    <div className="relative flex items-center justify-start w-[340px] h-[812px] mr-1 overflow-hidden">
      <Diary></Diary>
      <Dimmed></Dimmed>
      <Share></Share>
    </div>
  );
}
