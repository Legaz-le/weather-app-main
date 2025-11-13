import Image from "next/image";
import { useUnit } from "@/context/UnitContext";
import { motion } from "framer-motion";
import { WeatherForecastProps } from "@/types/component";

export const WeatherForecast = ({
  day,
  img,
  highestTemp,
  lowestTemp,
}: WeatherForecastProps) => {
  const { unitMode } = useUnit();
  return (
    <div className="w-full backdrop-blur-md  rounded-xl flex flex-col items-center border border-white/20 bg-white/10 px-2.5 py-4 text-center xl:w-[100.57px]">
      <p className=" text-lg font-[500]">{day}</p>
      <Image
        src={img}
        alt="icon-overcast"
        width={64}
        height={64}
        className="object-cover xl:py-2"
      />
      <motion.div
        key={unitMode}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="flex items-center justify-between w-full  text-[16px] font-[500]"
      >
        <span className="">
          {unitMode === "metric"
            ? `${highestTemp}°`
            : `${Math.round((highestTemp * 9) / 5 + 32)}°`}
        </span>
        <span className="text-[#D4D3D9]">
          {unitMode === "metric"
            ? `${lowestTemp}°`
            : `${Math.round((lowestTemp * 9) / 5 + 32)}°`}
        </span>
      </motion.div>
    </div>
  );
};
