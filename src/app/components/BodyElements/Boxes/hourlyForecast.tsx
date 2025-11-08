import { useUnit } from "@/context/UnitContext";
import Image from "next/image";
import { motion } from "framer-motion";

type HourForecastType = {
  img: string;
  hour: string;
  temp: number;
};

export const HourForecast = ({ img, hour, temp }: HourForecastType) => {
  const { unitMode } = useUnit();
  return (
    <div className="p-forDailyForecast  flex w-full items-center justify-between rounded-lg border backdrop-blur-md border-white/20 bg-white/10">
      <div className="flex flex-row items-center gap-3">
        <Image src={img} alt="weather-icon" width={40} height={40} />
        <span className=" text-xl font-[500]">{hour}</span>
      </div>
      <motion.div
        key={unitMode}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className=" text-[16px] font-[500]"
      >
        {unitMode === "metric"
          ? `${temp}°`
          : `${Math.round((temp * 9) / 5 + 32)}°`}
      </motion.div>
    </div>
  );
};
