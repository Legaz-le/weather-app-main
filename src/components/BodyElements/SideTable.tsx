import { HourlyForecastData } from "../../mockData/data";
import { HourForecast } from "./Boxes/hourForecast";
import dropdown from "/images/icon-dropdown.svg";

export const SideTable = () => {
  return (
    <div className="p-6 bg-[#262540] rounded-[20px] flex flex-col items-start w-full gap-[16px]">
      <div className="flex  w-full xl:w-[333px]   flex-row justify-between items-center">
        <p className="font-DM-Sans  xl:text-xl font-[600]">
          Hourly forecast
        </p>
        <button className="px-4 py-2 flex flex-row  gap-3 bg-[#3C3B5E] rounded-lg">
          <p className="font-DM-Sans xl:text-[16px] font-[500]">Tuesday</p>{" "}
          <img src={dropdown} alt="icon-dropDrown" />
        </button>
      </div>
      {HourlyForecastData.map((data)=> (
        <HourForecast 
        key={data.key}
        hour={data.hour}
        img={data.img}
        temp={data.Temp}/>
      ))}
    </div>
  );
};
