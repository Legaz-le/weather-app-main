import { BottomTable } from "./Bodyelements/BottomTable";
import { MainInfo } from "./Bodyelements/MainInfo";
import { SideTable } from "./Bodyelements/SideTable";

export const MainBody = () => {
  return (
    <div>
      <MainInfo/>
      <SideTable/>
      <BottomTable />
    </div>
  );
};
