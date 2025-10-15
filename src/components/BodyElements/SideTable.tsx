import { useState } from "react";
import { HourlyForecastData } from "../../mockData/data";
import { HourForecast } from "./Boxes/hourlyForecast";
import dropdown from "/images/icon-dropdown.svg";

export const SideTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-6 bg-[#262540] rounded-[20px] flex flex-col items-start w-full gap-[16px]">
      <div className="flex  w-full    flex-row justify-between items-center">
        <p className="font-DM-Sans  xl:text-xl font-[600]">Hourly forecast</p>
        <button
          onClick= {() => setIsOpen(!isOpen)}
          className="px-4 py-2 flex flex-row  gap-3 bg-[#3C3B5E] rounded-lg
          cursor-pointer transition duration-300 focus:outline-none 
             focus:ring-1 focus:ring-Neutral-0 focus:ring-offset-1 relative"
        >
          <p className="font-DM-Sans xl:text-[16px] font-[500]">Tuesday</p>
          <img src={dropdown} alt="icon-dropDrown" />
          {isOpen && (
            <div className="absolute top-full  bg-Neutral-800 rounded-xl flex flex-col right-0 mt-2 p-2 gap-1 border-inline z-10 text-start w-[214px]">
              <p className="px-2 py-2.5 flex flex-row  rounded-lg gap-2.5 bg-Neutral-700 font-[500] text-[16px] font-DM-Sans">
                Monday
              </p>
              <p className="px-2 py-2.5 flex flex-row  rounded-lg gap-2.5 font-[500] text-[16px] font-DM-Sans">
                Tuesday
              </p>
              <p className="px-2 py-2.5 flex flex-row  rounded-lg gap-2.5  font-[500] text-[16px] font-DM-Sans">
                Wednesday
              </p>
              <p className="px-2 py-2.5 flex flex-row  rounded-lg gap-2.5  font-[500] text-[16px] font-DM-Sans">
                Thursday
              </p>
              <p className="px-2 py-2.5 flex flex-row  rounded-lg gap-2.5  font-[500] text-[16px] font-DM-Sans">
                Friday
              </p>
              <p className="px-2 py-2.5 flex flex-row  rounded-lg gap-2.5  font-[500] text-[16px] font-DM-Sans">
                Saturday
              </p>
              <p className="px-2 py-2.5 flex flex-row  rounded-lg gap-2.5  font-[500] text-[16px] font-DM-Sans">
                Sunday
              </p>
            </div>
          )}
        </button>
      </div>
      {HourlyForecastData.map((data) => (
        <HourForecast
          key={data.key}
          hour={data.hour}
          img={data.img}
          temp={data.Temp}
        />
      ))}
    </div>
  );
};
