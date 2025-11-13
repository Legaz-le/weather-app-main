import { useEffect, useState } from "react";
import { UnitMode } from "@/types/weather";

interface UnitPreference {
  temperature: string;
  windSpeed: string;
  precipitation: string;
}

const STORAGE_KEY = "unitPreferences";

export const useUnitPreference = (unitMode: UnitMode) => {
  const [preferences, setPreferences] = useState<UnitPreference>({
    temperature: unitMode === "metric" ? "°C" : "°F",
    windSpeed: unitMode === "metric" ? "m/s" : "mph",
    precipitation: unitMode === "metric" ? "mm" : "in",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse unit preferences:", error);
      }
    }
  }, []);

  useEffect(() => {
    const newPreferences: UnitPreference = {
      temperature: unitMode === "metric" ? "°C" : "°F",
      windSpeed: unitMode === "metric" ? "m/s" : "mph",
      precipitation: unitMode === "metric" ? "mm" : "in",
    };
    
    setPreferences(newPreferences);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
  }, [unitMode]);

  return preferences;
};