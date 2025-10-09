import { DailyForecastData } from "../../mockData/data";
import { WeatherForecast } from "./Boxes/weatherForecast";

export const BottomTable = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="text-xl  font-DM-Sans font-[600]">Daily forecast</p>
      <div className="grid grid-cols-3 sm:grid-cols-7 w-full gap-4">
        {DailyForecastData.map((data) => (
          <WeatherForecast
            key={data.key}
            day={data.Name}
            img={data.img}
            higestTemp={data.higestTem}
            lowestTemp={data.lowestTem}
          />
        ))}
      </div>
    </div>
  );
};
