import { useState, useEffect } from "react";

const STORAGE_KEY = "searchedCities";
const MAX_HISTORY = 5;
const LAST_CITY_KEY = "lastCity";

export const useSearchHistory = () => {
  const [searchedCities, setSearchedCities] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSearchedCities(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Failed to parse search history:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchedCities));
  }, [searchedCities]);

  const addCity = (cityName: string) => {
    const trimmed = cityName.trim();
    if (!trimmed) return;

    setSearchedCities((prev) => {
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== trimmed.toLowerCase()
      );

      const updated = [...filtered, trimmed];
      localStorage.setItem(LAST_CITY_KEY, trimmed);
      return updated.slice(-MAX_HISTORY);
    });
  };

  const deleteCity = (cityName: string) => {
    const trimmed = cityName.trim();
    if (!trimmed) return;
    setSearchedCities((prev) => {
      
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== trimmed.toLowerCase()
      );
      return filtered
    });
  };

  return {
    deleteCity,
    searchedCities,
    addCity,
  };
};
