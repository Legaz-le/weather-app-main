import { useUnit } from "@/context/UnitContext";
import Image from "next/image";

type HourForecastType = {
  img: string;
  hour: string;
  temp: number;
};

export const HourForecast = ({ img, hour, temp }: HourForecastType) => {
  const { unitMode } = useUnit();
  return (
    <div className="p-forDailyForecast border-inline flex w-full items-center justify-between rounded-lg bg-[#302F4A]">
      <div className="flex flex-row items-center gap-3">
        <Image src={img} alt="drizzle_icon" width={40} height={40} />
        <span className=" text-xl font-[500]">{hour}</span>
      </div>
      <span className=" text-[16px] font-[500]">
        {unitMode === "metric"
          ? `${temp}°`
          : `${Math.round((temp * 9) / 5 + 32)}°`}
      </span>
    </div>
  );
};
