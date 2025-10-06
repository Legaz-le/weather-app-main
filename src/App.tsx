import { MainBody } from "./components/MainBody";
import { TopSide } from "./components/TopSide";

export const App = () => {
  return (
    <div className="flex flex-col items-center justify-center  container mx-auto  px-28 w-full  py-12 text-Neutral-0">
      <TopSide />
      <MainBody />
    </div>
  );
};
