import { BottomTable } from "./BodyElements/BottomTable";
import { MainInfo } from "./BodyElements/MainInfo";
import { SideTable } from "./BodyElements/SideTable";

export const MainBody = () => {
  return (
    <div className="flex w-full">
      <div className="w-full">
        <MainInfo />
        <BottomTable />
      </div>
      <SideTable />
    </div>
  );
};
