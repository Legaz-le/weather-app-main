import { WeaterForecast } from "./Boxes/weaterForecast";

export const BottomTable = () => {
  return (
    <div className=" ">
      <p className="text-[20px]">Weather forecast</p>
      <WeaterForecast />
    </div>
  );
};
