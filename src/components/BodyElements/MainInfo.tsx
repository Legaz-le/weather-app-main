import bg from "/images/bg-today-large.svg";
import bg_mobile from "/images/bg-today-small.svg";
import { WeatherInfo } from "./Boxes/weatherInfo";
import sunny_icon from "/images/icon-sunny.webp";
import { MainInfoData } from "../../mockData/data";

export const MainInfo = () => {
  return (
    <div className="flex flex-col gap-8  mb-12  relative w-full ">
      <picture>
        <source media="(min-width: 465px)" srcSet={bg} />
        <img src={bg_mobile} alt="blue-background" className="w-full" />
      </picture>
      <div className="absolute inset-x-4 py-15 xl:px-6 xl:py-20 lg:py-10  flex flex-col md:flex-row justify-between items-center z-10 ">
        <div className="flex flex-col gap-3 ">
          <p className="text-[28px] font-[700] font-DM-Sans">Berlin, Germany</p>
          <p className="text-lg font-[500] font-DM-Sans ">
            Tuesday, August 5, 2025
          </p>
        </div>
        <div className="flex items-center gap-5 ">
          <img src={sunny_icon} alt="sunny_icon" className=" w-[120px]" />
          <span className="text-8xl  font-DM-Sans font-[600] italic text-white tracking-[-0.02em]">
            20°
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 w-full  gap-6">
        {MainInfoData.map((data) => (
          <WeatherInfo key={data.key} Name={data.Name} number={data.number} />
        ))}
      </div>
    </div>
  );
};
