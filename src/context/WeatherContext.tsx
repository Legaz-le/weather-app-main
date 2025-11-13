"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import {
  WeatherData,
  WeatherContextType,
  WeatherErrorType,
} from "@/types/weather";

const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<WeatherErrorType>(null);

  return (
    <WeatherContext.Provider
      value={{ city, setCity, error, loading, setLoading, setError }}
    >
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
