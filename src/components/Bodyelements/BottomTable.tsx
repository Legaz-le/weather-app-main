import { WeatherForecast } from "../BodyElements/Boxes/weatherForecast";

export const BottomTable = () => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[20px]">Weather forecast</p>
      <WeatherForecast />
    </div>
  );
};
