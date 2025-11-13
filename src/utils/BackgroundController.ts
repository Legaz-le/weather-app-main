"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { useWeather } from "@/context/WeatherContext";

export const BackgroundController = () => {
  const { city } = useWeather();
  useEffect(() => {
    if (!city) return;

    const weather = city.hourly?.weathercode?.[0] ?? 0 ;
    let gradient = "linear-gradient(#1e3a8a, #312e81)";

    if (weather >= 0 && weather < 3)
      gradient = "linear-gradient(#60a5fa, #1e3a8a)";
    else if (weather < 50) gradient = "linear-gradient(#64748b, #334155)";
    else if (weather >= 50 && weather < 70)
      gradient = "linear-gradient(#3b82f6, #1e40af)";
    else if (weather >= 70) gradient = "linear-gradient(#e0e7ff, #93c5fd)";

    gsap.to(".app-bg", {
      background: gradient,
      duration: 1.5,
      ease: "power2.out",
    });
  }, [city?.hourly?.weathercode?.[0]]);

  return null;
};
