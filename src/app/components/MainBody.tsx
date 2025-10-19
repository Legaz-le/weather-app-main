import { BottomTable } from "./BodyElements/BottomTable";
import { MainInfo } from "./BodyElements/MainInfo";
import { SideTable } from "./BodyElements/SideTable";

export const MainBody = () => {
  return (
    <div className="flex w-full flex-col justify-center gap-8 lg:flex-row">
      <div className="w-full flex-col">
        <MainInfo />
        <BottomTable />
      </div>
      <div className="w-full">
        <SideTable />
      </div>
    </div>
  );
};
