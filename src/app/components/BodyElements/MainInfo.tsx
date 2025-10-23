"use client";

import bg from "../../../../public/images/bg-today-large.svg";
import bg_mobile from "../../../../public/images/bg-today-small.svg";
import { WeatherInfo } from "./Boxes/weatherInfo";
import { MainInfoData } from "../../../mockData/data";
import Image from "next/image";
import { useWeather } from "@/context/WeatherContext";
import { useUnit } from "@/context/UnitContext";

export const MainInfo = () => {
  const { city } = useWeather();
  const { unitMode } = useUnit();

  const today = new Date();

  return (
    <div className="relative mb-12 flex w-full flex-col gap-8">
      <div className="w-full">
        <Image
          src={bg_mobile}
          alt="blue-background"
          className="object-cover sm:hidden w-full"
        />
        <Image
          src={bg}
          alt="blue-background-large"
          className="hidden  sm:block w-full "
        />
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
        <div className="flex items-center gap-5 ">
          <Image
            src={city?.hourly?.weatherIcons?.[0] || "/images/default-icon.webp"}
            alt="sunny_icon"
            width={120}
            height={0}
          />
          <span className="text-8xl font-[600] tracking-[-0.02em] text-white italic">
            {unitMode === "metric"
              ? `${Math.round(city?.temperature ?? 0)}°`
              : `${Math.round(((city?.temperature ?? 0) * 9) / 5 + 32)}°`}
          </span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 md:flex">
        {MainInfoData.map((data) => (
          <WeatherInfo key={data.key} Name={data.Name} />
        ))}
      </div>
    </div>
  );
};
