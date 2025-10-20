"use client";

import { useState } from "react";
import { HourlyForecastData } from "../../../mockData/data";
import { HourForecast } from "./Boxes/hourlyForecast";
import dropdown from "../../../../public/images/icon-dropdown.svg";
import Image from "next/image";

export const SideTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="side-table">
      <div className="side-table__header">
        <p className="font-DM-Sans font-[600] xl:text-xl">Hourly forecast</p>
        <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
          <p className="font-DM-Sans font-[500] xl:text-[16px]">Tuesday</p>
          <Image src={dropdown} alt="icon-dropdown" width={0} height={0} />

          {isOpen && (
            <div className="dropdown-menu border-inline">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <p key={day} className="dropdown-item">
                  {day}
                </p>
              ))}
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
