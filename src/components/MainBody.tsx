import { BottomTable } from "./BodyElements/BottomTable";
import { MainInfo } from "./BodyElements/MainInfo";
import { SideTable } from "./BodyElements/SideTable";

export const MainBody = () => {
  return (
    <div className="flex items-center justify-center flex-col lg:flex-row w-full gap-8 ">
      <div className="flex-1 flex-col w-full w-[]">
        <MainInfo />
        <BottomTable />
      </div>
      <div className="flex-1 w-full ">
        <SideTable />
      </div>
    </div>
  );
};
