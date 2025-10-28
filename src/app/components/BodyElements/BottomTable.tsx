"use client";

import { WeatherForecast } from "./Boxes/weatherForecast";
import { useWeather } from "@/context/WeatherContext";
import { motion, AnimatePresence } from "framer-motion";

export const BottomTable = () => {
  const { city, loading } = useWeather();
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todayIndex = new Date().getDay();
  const adjustedIndex = todayIndex === 0 ? 6 : todayIndex - 1;

  const orderedWeekDays = [
    ...weekDays.slice(adjustedIndex),
    ...weekDays.slice(0, adjustedIndex),
  ];
  
  return (
    <div className="flex w-full flex-col gap-5">
      <p className=" text-xl font-[600]">Daily forecast</p>
      <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-7 md:flex md:justify-between">
        <AnimatePresence mode="wait">
          {loading || !city ? (
            Array.from({ length: 7 }).map((_, i) => (
              <motion.div
                key={i}
                className="border-inline rounded-xl bg-[#262540] px-2.5 py-4 w-[100px] h-[165px] text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></motion.div>
            ))
          ) : (
            <motion.div
              className="flex w-full flex-row gap-4 md:justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
            >
              {city?.daily?.highTemp.map((high, index) => (
                <WeatherForecast
                  key={index}
                  day={orderedWeekDays[index]}
                  img={city?.daily?.weatherIcons?.[index] || " "}
                  highestTemp={Math.round(high)}
                  lowestTemp={Math.trunc(city?.daily?.lowTemp[index] || 0)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
