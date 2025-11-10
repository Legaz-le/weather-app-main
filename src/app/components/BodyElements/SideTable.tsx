"use client";

import { useState, useEffect, useRef } from "react";
import { HourForecast } from "./Boxes/hourlyForecast";
import { useWeather } from "@/context/WeatherContext";
import { getWeatherIcon } from "@/utils/weatherCodeToIcon";
import dropdown from "../../../../public/images/icon-dropdown.svg";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export const SideTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const { city, loading } = useWeather();
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayIndex = weekDays.indexOf(today);
  const orderedWeekDays = [
    ...weekDays.slice(todayIndex),
    ...weekDays.slice(0, todayIndex),
  ];
  const [selectedDay, setSelectedDay] = useState<string>(weekDays[todayIndex]);

  const filteredHours = (city?.hourly?.time || [])
    .map((time, index) => {
      const dateInCity = new Date(
        new Intl.DateTimeFormat("en-US", {
          timeZone: city?.timezone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(time))
      );

      const hour = dateInCity.getHours();
      const weatherCode = city?.hourly?.weathercode?.[index] ?? 0;
      const icon = getWeatherIcon(weatherCode, hour);

      return {
        time: dateInCity,
        temp: city?.hourly?.temperature?.[index] ?? 0,
        icon,
        dayName: new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          timeZone: city?.timezone,
        }).format(dateInCity),
      };
    })
    .filter((hour) => {
      if (!hour.time) return false;

      const nowInCity = new Date(
        new Intl.DateTimeFormat("en-US", {
          timeZone: city?.timezone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date())
      );

      const todayInCity = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone: city?.timezone,
      }).format(nowInCity);

      if (selectedDay === todayInCity) {
        const nextDayNoon = new Date(nowInCity);
        nextDayNoon.setDate(nowInCity.getDate() + 1);
        nextDayNoon.setHours(12, 0, 0, 0);
        return hour.time >= nowInCity && hour.time <= nextDayNoon;
      } else {
        const selectedDayIndex = weekDays.indexOf(selectedDay);
        const dayStart = new Date(nowInCity);
        const dayDiff = (selectedDayIndex - nowInCity.getDay() + 7) % 7;
        dayStart.setDate(nowInCity.getDate() + dayDiff);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 99);

        return hour.time >= dayStart && hour.time <= dayEnd;
      }
    });

  useEffect(() => {
    const savedDay = localStorage.getItem("selectedDay");
    if (savedDay) setSelectedDay(savedDay);
  }, []);

  return (
    <div className="side-table">
      <div className="side-table__header">
        <p className="font-DM-Sans font-[600] xl:text-xl">Hourly forecast</p>

        <div ref={dropdownRef} className="relative inline-block">
          <motion.button
            role="button"
            onClick={() => setIsOpen((prev) => !prev)}
            whileHover={{
              y: -3,
              boxShadow: "0 4px 12px rgba(255,255,255,0.15)",
            }}
            whileTap={{
              scale: 0.97,
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="dropdown-btn btn-gradient  flex items-center gap-2"
          >
            <p className="font-DM-Sans font-[500] xl:text-[16px]">
              {selectedDay}
            </p>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image src={dropdown} alt="icon-dropdown" width={0} height={0} />
            </motion.div>
          </motion.button>

          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="dropdown-menu border-inline absolute top-full  mt-2 z-50 cursor-pointer"
              >
                {orderedWeekDays.map((day) => (
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className=" w-full flex flex-col gap-3 overflow-y-auto lg:max-h-[500px] xl:max-h-[600px]">
        <AnimatePresence mode="wait">
          {loading || !city
            ? Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="p-forDailyForecast border-inline flex w-full h-[60px] items-center justify-between rounded-lg bg-[#302F4A] animate-pulse"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                />
              ))
            : filteredHours.map((hour) => {
                const formattedHour = hour.time.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                  timeZone: city.timezone,
                });
                return (
                  <motion.div
                    key={hour.time.toISOString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 1 }}
                  >
                    <HourForecast
                      key={hour.time.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        hour12: true,
                        timeZone: city.timezone,
                      })}
                      hour={formattedHour}
                      img={hour.icon}
                      temp={Math.round(hour.temp)}
                    />
                  </motion.div>
                );
              })}
        </AnimatePresence>
      </div>
    </div>
  );
};
