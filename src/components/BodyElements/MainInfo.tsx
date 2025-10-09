import bg from "/images/bg-today-large.svg";
import { WeatherInfo } from "./Boxes/weatherInfo";
import sunny_icon from "/images/icon-sunny.webp";
import { MainInfoData } from "../../mockData/data";

export const MainInfo = () => {
  return (
    <div className="flex flex-col gap-8  mb-12  relative w-full ">
      <img src={bg} alt="blue-background" className="w-full" />
      <div className="absolute inset-x-4 xl:px-6 xl:py-20 lg:py-10 flex flex-col lg:flex-row justify-between items-center z-10 ">
        <div className="flex flex-col gap-3 ">
          <p className="text-[28px] font-[700] font-DM-Sans">Berlin, Germany</p>
          <p className="text-lg font-[500] font-DM-Sans text-[#D4D3D9]">
            Tuesday, August 5, 2025
          </p>
        </div>
        <div className="flex items-center gap-5 ">
          <img
            src={sunny_icon}
            alt="sunny_icon"
            className=" lg:w-[120px]"
          />
          <span className="text-4xl lg:text-8xl  font-DM-Sans font-[600] italic text-white tracking-[-0.02em]">
            20°
          </span>
        </div>
      </div>
      <div className="flex w-full gap-6">
      {MainInfoData.map((data) => (
        <WeatherInfo key={data.key} Name={data.Name} number={data.number} />
      ))}
      </div>
    </div>
  );
};
