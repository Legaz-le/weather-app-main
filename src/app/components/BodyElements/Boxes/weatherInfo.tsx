"use client";

import { useWeather } from "@/context/WeatherContext";
import { useUnit } from "@/context/UnitContext";
import { motion } from "framer-motion";
import { WeatherInfoProps } from "@/types/component";

export const WeatherInfo = ({ Name }: WeatherInfoProps) => {
  const { city } = useWeather();
  const { unitMode } = useUnit();

  const getValue = () => {
    if (!city) return "N/A";

    switch (Name.toLowerCase()) {
      case "feels like":
        return unitMode === "metric"
          ? `${Math.round(city.temperature)}°`
          : `${Math.round((city.temperature * 9) / 5 + 32)}°`;

      case "humidity":
        return `${city.humidity}%`;

      case "wind":
        return unitMode === "metric"
          ? `${Math.round(city.windSpeed * 3.6)} km/h`
          : `${Math.round(city.windSpeed * 2.237)} mph`;

      case "perception":
        return unitMode === "metric"
          ? `${city.perception} mm`
          : `${(city.perception * 0.03937).toFixed(2)} in`;

      default:
        return "N/A";
    }
  };
  return (
    <div className=" backdrop-blur-md  flex w-full flex-col justify-start gap-6 rounded-xl border border-white/20 bg-white/10 p-5">
      <p className="text-lg leading-[120%] font-medium text-[#D4D3D9]">
        {Name}
      </p>
      <motion.div layout className="text-[32px] leading-[100%] font-light">
        <motion.div
          key={unitMode}
          layout
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="block "
        >
          {getValue()}
        </motion.div>
      </motion.div>
    </div>
  );
};
