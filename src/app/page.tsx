import { MainBody } from "./components/MainBody";
import { TopSide } from "./components/TopSide";
import { BackgroundController } from "@/utils/BackgroundController";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center  w-full  p-window    text-Neutral-0">
      <BackgroundController />
      <TopSide />
      <MainBody />
    </div>
  );
}