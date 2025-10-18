import { DailyForecastData } from "../../mockData/data";
import { WeatherForecast } from "./Boxes/weatherForecast";

export const BottomTable = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className=" text-xl font-[600]">Daily forecast</p>
      <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-7 md:flex md:justify-between">
        {DailyForecastData.map((data) => (
          <WeatherForecast
            key={data.key}
            day={data.Name}
            img={data.img}
            highestTemp={data.highestTem}
            lowestTemp={data.lowestTem}
          />
        ))}
      </div>
    </div>
  );
};
