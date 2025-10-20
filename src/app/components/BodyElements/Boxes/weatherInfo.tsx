"use client";

import { useWeather } from "@/context/WeatherContext";

type MainInfoType = {
  Name: string;
};

export const WeatherInfo = ({ Name }: MainInfoType) => {
  const { city } = useWeather();

  const getValue = () => {
    if (!city) return "N/A";

    switch (Name.toLowerCase()) {
      case "feels like":
        return `${Math.round(city.temperature)}°`;
      case "humidity":
        return `${city.humidity}%`;
      case "wind":
        return `${Math.round(city.windSpeed)} km/h`;
      case "perception":
        return `${city.perception} mm`;
      default:
        return "N/A";
    }
  };
  return (
    <div className="border-inline flex w-full flex-col justify-start gap-6 rounded-xl bg-[#262540] p-5">
      <p className="text-lg leading-[120%] font-medium text-[#D4D3D9]">
        {Name}
      </p>
      <span className="text-[32px] leading-[100%] font-light">
        {getValue()}
      </span>
    </div>
  );
};
