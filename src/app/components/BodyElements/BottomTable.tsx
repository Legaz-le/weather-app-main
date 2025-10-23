"use client";

import { WeatherForecast } from "./Boxes/weatherForecast";
import { useWeather } from "@/context/WeatherContext";

export const BottomTable = () => {
  const { city } = useWeather();
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todayIndex = new Date().getDay();
  const adjustedIndex = todayIndex === 0 ? 6 : todayIndex - 1;

  const orderedWeekDays = [
    ...weekDays.slice(adjustedIndex),
    ...weekDays.slice(0, adjustedIndex),
  ];

  console.log(orderedWeekDays);
  return (
    <div className="flex w-full flex-col gap-5">
      <p className=" text-xl font-[600]">Daily forecast</p>
      <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-7 md:flex md:justify-between">
        {city?.daily?.highTemp.map((high, index) => (
          <WeatherForecast
            key={index}
            day={orderedWeekDays[index]}
            img={
              city?.daily?.weatherIcons?.[index] || "/images/default-icon.webp"
            }
            highestTemp={Math.round(high)}
            lowestTemp={Math.trunc(city?.daily?.lowTemp[index] || 0)}
          />
        ))}
      </div>
    </div>
  );
};
