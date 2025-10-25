"use client";

import { useState, useEffect } from "react";
import { HourForecast } from "./Boxes/hourlyForecast";
import { useWeather } from "@/context/WeatherContext";
import { formatHour } from "@/utils/weatherCodeToIcon";
import dropdown from "../../../../public/images/icon-dropdown.svg";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const SideTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { city, loading } = useWeather();
  const now = new Date();
  const today = now.getDay();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayText = weekDays[today];
  const [selectedDay, setSelectedDay] = useState(todayText);
  const filteredHours =
    city?.hourly?.time
      .map((time, index) => {
        const date = new Date(time);
        const dayName = weekDays[date.getDay()];
        return {
          time,
          temp: city.hourly?.temperature?.[index] ?? 0,
          icon:
            city.hourly?.weatherIcons?.[index] || "/images/default-icon.webp",
          dayName,
        };
      })
      .filter((hour) => {
        if (hour.dayName !== selectedDay) return false;
        if (selectedDay === todayText) return new Date(hour.time) >= now;
        return true;
      }) || [];

  useEffect(() => {
    const savedDay = localStorage.getItem("selectedDay");
    if (savedDay) {
      setSelectedDay(savedDay);
    }
  }, []);

  return (
    <div className="side-table">
      <div className="side-table__header">
        <p className="font-DM-Sans font-[600] xl:text-xl">Hourly forecast</p>
        <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
          <p className="font-DM-Sans font-[500] xl:text-[16px]">
            {selectedDay}
          </p>
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
                  className={`dropdown-item ${
                    selectedDay === day ? "bg-Neutral-700" : ""
                  }`}
                  onClick={() => {
                    setSelectedDay(day);
                    localStorage.setItem("selectedDay", day);
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
      <AnimatePresence>
        {loading || !city ? (
          <div
            className="w-full flex flex-col gap-3  overflow-y-auto
             lg:max-h-[500px] xl:max-h-[600px]"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <>
                <motion.div
                  key={i}
                  className="p-forDailyForecast border-inline flex w-full h-[60px] items-center justify-between animate-pulse rounded-lg bg-[#302F4A]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div />
              </>
            ))}
          </div>
        ) : (
          <div
            className="w-full flex flex-col gap-3  overflow-y-auto
             lg:max-h-[500px] xl:max-h-[600px]"
          >
            {filteredHours.map((hour, index) => (
              <HourForecast
                key={index}
                hour={formatHour(hour.time)}
                img={hour.icon}
                temp={Math.round(hour.temp)}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
