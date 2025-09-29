import { MainBody } from "./components/MainBody";
import { TopSide } from "./components/TopSide";

export const App = () => {
  return (
    <div className="flex items-center justify-center container mx-auto">
      <div className="flex flex-col">
        <TopSide />
        <MainBody />
      </div>
    </div>
  );
};
