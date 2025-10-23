import Image from "next/image";
import { useUnit } from "@/context/UnitContext";

type weatherForecastType = {
  day: string;
  img: string;
  highestTemp: number;
  lowestTemp: number;
};

export const WeatherForecast = ({
  day,
  img,
  highestTemp,
  lowestTemp,
}: weatherForecastType) => {
  const { unitMode } = useUnit();
  return (
    <div className="border-inline w-full  rounded-xl flex flex-col items-center bg-[#262540] px-2.5 py-4 text-center xl:w-[100.57px]">
      <p className=" text-lg font-[500]">{day}</p>
      <Image
        src={img}
        alt="icon-overcast"
        width={64}
        height={64}
        className="object-cover xl:py-2"
      />
      <div className="flex items-center justify-between w-full  text-[16px] font-[500]">
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
      </div>
    </div>
  );
};
