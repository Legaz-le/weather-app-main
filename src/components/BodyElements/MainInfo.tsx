import bg from "/images/bg-today-large.svg";
import bg_mobile from "/images/bg-today-small.svg";
import { WeatherInfo } from "./Boxes/weatherInfo";
import sunny_icon from "/images/icon-sunny.webp";
import { MainInfoData } from "../../mockData/data";

export const MainInfo = () => {
  return (
    <div className="relative mb-12 flex w-full flex-col gap-8">
      <picture>
        <source media="(min-width: 465px)" srcSet={bg} />
        <img src={bg_mobile} alt="blue-background" className="w-full" />
      </picture>
      <div className="absolute inset-x-4 z-10 flex flex-col items-center justify-between py-15 md:flex-row lg:py-10 xl:px-6 xl:py-20">
        <div className="flex flex-col gap-3">
          <p className="text-[28px] font-[700]">Berlin, Germany</p>
          <p className="text-lg font-[500]">
            Tuesday, August 5, 2025
          </p>
        </div>
        <div className="flex items-center gap-5">
          <img src={sunny_icon} alt="sunny_icon" className="w-[120px]" />
          <span className=" text-8xl font-[600] tracking-[-0.02em] text-white italic">
            20°
          </span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 md:flex">
        {MainInfoData.map((data) => (
          <WeatherInfo key={data.key} Name={data.Name} number={data.number} />
        ))}
      </div>
    </div>
  );
};
