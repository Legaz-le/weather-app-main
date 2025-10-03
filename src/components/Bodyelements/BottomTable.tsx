import { WeaterForecast } from "./Boxes/weaterForecast";

export const BottomTable = () => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[20px]">Weather forecast</p>
      <WeaterForecast />
    </div>
  );
};
