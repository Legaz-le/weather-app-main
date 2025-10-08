import { DailyForecastData } from "../../mockData/data";
import { WeatherForecast } from "./Boxes/weatherForecast";

export const BottomTable = () => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-xl  font-DM-Sans font-[600]">Daily forecast</p>
      <div className="flex gap-4">
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
