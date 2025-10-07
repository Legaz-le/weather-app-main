import bg from "/images/bg-today-large.svg";
import { WeatherInfo } from "./Boxes/weatherInfo";
import sunny_icon from "/images/icon-sunny.webp";

export const MainInfo = () => {
  return (
    <div className="flex flex-col gap-8  mb-12 mr-8 relative">
      <img src={bg} alt="blue-background" className="z-0" />
      <div className="absolute py-20  px-6 flex w-full justify-between items-center z-10">
        <div className="flex flex-col gap-3 ">
          <p className="text-[28px] font-[700] font-DM-Sans">Berlin, Germany</p>
          <p className="text-lg font-[500] font-DM-Sans text-[#D4D3D9]">
            Tuesday, August 5, 2025
          </p>
        </div>
        <div className="flex items-center gap-5 ">
          <img src={sunny_icon} alt="sunny_icon" className="w-[120px] h-[120px]" />
          <span className="text-8xl font-DM-Sans font-[600] italic text-white tracking-[-0.02em]">20°</span>
        </div>
      </div>
      <WeatherInfo />
    </div>
  );
};
