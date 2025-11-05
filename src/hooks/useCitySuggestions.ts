import  useSWRMutation  from "swr/mutation";
import { fetcher } from "./useWeatherSearch"; 
import { useCallback } from "react";


export const useWeatherSuggestion = (setLoading: (cities: boolean) => void, setSuggestions: (cities: string[]) => void)  => {

  const { trigger: fetchCities } = useSWRMutation(
    "/api/weather",
    async (_key, { arg: city }: { arg: string }) => {
      const data = await fetcher(`/api/weather?city=${encodeURIComponent(city)}&type=suggestions`);
      return data;
    }
  );

  const handleCities = useCallback(
    async (city: string) => {
      if (!city.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true)
        const result = await fetchCities(city);

        if (result?.suggestions) {
          const cityNames = result.suggestions.map((c: {name: string, country: string}) => `${c.name}, ${c.country}`);
          setSuggestions(cityNames);
          setLoading(false) 
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Failed to fetch city suggestions:", err);
        setSuggestions([]);
        setLoading(false)
      }
    },
    [fetchCities, setSuggestions, setLoading]
  );

  return { handleCities };
};