"use client";

import { WeatherForecast } from "./Boxes/weatherForecast";
import { useWeather } from "@/context/WeatherContext";

export const BottomTable = () => {
  const { city } = useWeather();
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="flex w-full flex-col gap-5">
      <p className=" text-xl font-[600]">Daily forecast</p>
      <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-7 md:flex md:justify-between">
        {city?.daily?.highTemp.map((high, index) => (
          <WeatherForecast
            key={index}
            day={weekDays[index]}
            img={
              city?.daily?.weatherIcons?.[index] || "/images/default-icon.webp"
            }
            highestTemp={`${Math.round(high).toString()}°`}
            lowestTemp={`${Math.trunc(city?.daily?.lowTemp[index] || 0).toString()}°`}
          />
        ))}
      </div>
    </div>
  );
};
