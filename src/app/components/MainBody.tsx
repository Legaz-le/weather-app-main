"use client";

import { useWeather } from "@/context/WeatherContext";
import { BottomTable } from "./BodyElements/BottomTable";
import { MainInfo } from "./BodyElements/MainInfo";
import { SideTable } from "./BodyElements/SideTable";

export const MainBody = () => {
  const { error } = useWeather();
  return (
    <div className="flex w-full flex-col justify-center gap-8 lg:flex-row">
      {error ? (
        <p className="font-DM-Sans font-[700] text-[28px]">
          No search result found!
        </p>
      ) : (
        <>
          <div className="w-full flex-col">
            <MainInfo />
            <BottomTable />
          </div>
          <div className="w-full">
            <SideTable />
          </div>
        </>
      )}
    </div>
  );
};
