"use client";

import { useState, useEffect, useRef } from "react";
import { HourForecast } from "./Boxes/HourlyForecast";
import { useWeather } from "@/context/WeatherContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useFilteredHours } from "@/hooks/useFilteredHours";

export const SideTable = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  const { filteredHours } = useFilteredHours(selectedDay);

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
              <Image
                src="/images/icon-dropdown.svg"
                alt="icon-dropdown"
                width={0}
                height={0}
              />
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
