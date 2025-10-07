import { WeatherForecast } from "./Boxes/weatherForecast";

export const BottomTable = () => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-xl  font-DM-Sans font-[600]">Daily forecast</p>
      <WeatherForecast />
    </div>
  );
};
