"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  perception: number;
  daily?: {
    highTemp: number[];
    lowTemp: number[];
    weatherIcons?: string[];
    hourly?: {
      time: string[];
      temperature: number[];
      weatherIcons?: string[];
    };
  };
  hourly?: {
    time: string[];
    temperature: number[];
    weatherIcons?: string[];
  };
};

interface WeatherContextProps {
  city: WeatherData | null;
  loading: boolean;
  error: string | null;
  setCity: (data: WeatherData) => void;
  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
