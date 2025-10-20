"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type WeatherData = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  perception: number;
};

interface WeatherContextProps {
  city: WeatherData | null;
  setCity: (data: WeatherData) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ city, setCity }}>
      {children}
    </WeatherContext.Provider>
  );

};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used inside a WeatherProvider");
  }
  return context;
};