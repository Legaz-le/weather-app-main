import { MainBody } from "./components/MainBody";
import { TopSide } from "./components/TopSide";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center  w-full  p-window    text-Neutral-0">
      <TopSide />

      <MainBody />
    </div>
  );
}