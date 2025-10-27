"use client";

import bg from "../../../../public/images/bg-today-large.svg";
import bg_mobile from "../../../../public/images/bg-today-small.svg";
import { WeatherInfo } from "./Boxes/weatherInfo";
import { MainInfoData } from "../../../mockData/data";
import Image from "next/image";
import { useWeather } from "@/context/WeatherContext";
import { useUnit } from "@/context/UnitContext";
import { motion, AnimatePresence } from "framer-motion";

export const MainInfo = () => {
  const { city, loading } = useWeather();
  const { unitMode } = useUnit();

  const today = new Date();

  return (
    <div className="relative mb-12 flex w-full flex-col gap-8">
      <AnimatePresence mode="wait">
        {loading || !city ? (
          <>
            <motion.div
              key="loading"
              className="relative flex h-[286px] w-full flex-col items-center justify-center rounded-xl bg-[#262540]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="h-12 w-12 rounded-full border-4 border-white/30 border-t-white"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 1,
                }}
              />
              <p className="mt-4 text-white/70 text-sm tracking-wide">
                Loading weather data...
              </p>
            </motion.div>
            <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 md:flex">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="border-inline flex w-full h-[118px]  justify-start gap-6 rounded-xl bg-[#262540] p-5 "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="relative w-full">
              <motion.div
                key="bg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
              >
                <Image
                  src={bg_mobile}
                  alt="blue-background"
                  className="object-cover sm:hidden w-full"
                />
                <Image
                  src={bg}
                  alt="blue-background-large"
                  className="hidden sm:block w-full"
                />
              </motion.div>
            </div>

            <div className="absolute font-DM-Sans inset-x-4 z-10 flex flex-col items-center justify-between py-15 md:flex-row lg:py-10 xl:px-6 xl:py-20">
              <div className="flex flex-col gap-3">
                <p className="text-[28px] font-[700]">
                  {city?.city}, {city?.country}
                </p>
                <p className="text-lg font-[500] opacity-80">
                  {today.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <Image
                  src={
                    city?.hourly?.weatherIcons?.[0] ||
                    "/images/default-icon.webp"
                  }
                  alt="weather_icon"
                  width={120}
                  height={120}
                />
                <span className="text-8xl font-[600] tracking-[-0.02em] text-white italic">
                  {unitMode === "metric"
                    ? `${Math.round(city?.temperature ?? 0)}°`
                    : `${Math.round(((city?.temperature ?? 0) * 9) / 5 + 32)}°`}
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 md:flex"
            >
              {MainInfoData.map((data) => (
                <WeatherInfo key={data.key} Name={data.Name} />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
