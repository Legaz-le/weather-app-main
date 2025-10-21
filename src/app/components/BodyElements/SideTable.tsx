"use client";

import { useState } from "react";
import { HourForecast } from "./Boxes/hourlyForecast";
import { useWeather } from "@/context/WeatherContext";
import { formatHour } from "@/utils/weatherCodeToIcon";
import dropdown from "../../../../public/images/icon-dropdown.svg";
import Image from "next/image";

export const SideTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { city } = useWeather();
  const [selectedDay, setSelectedDay] = useState("Tuesday");
  return (
    <div className="side-table">
      <div className="side-table__header">
        <p className="font-DM-Sans font-[600] xl:text-xl">Hourly forecast</p>
        <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
          <p className="font-DM-Sans font-[500] xl:text-[16px]">Tuesday</p>
          <Image src={dropdown} alt="icon-dropdown" width={0} height={0} />

          {isOpen && (
            <div className="dropdown-menu border-inline">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <p
                  key={day}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedDay(day);
                    setIsOpen(false);
                  }}
                >
                  {day}
                </p>
              ))}
            </div>
          )}
        </button>
      </div>
      <div
        className="w-full flex flex-col gap-4 max-h-[600px] overflow-y-auto
             lg:max-h-[500px] xl:max-h-[600px]"
      >
        {city?.hourly?.time?.map((time, index) => (
          <HourForecast
            key={index}
            hour={formatHour(time)}
            img={
              city?.hourly?.weatherIcons?.[index] || "/images/default-icon.webp"
            }
            temp={`${Math.round(city?.hourly?.temperature?.[index] ?? 0)}°`}
          />
        ))}
      </div>
    </div>
  );
};
