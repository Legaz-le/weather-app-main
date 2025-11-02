import { useWeather } from "@/context/WeatherContext";
import { weatherCodeToIcon } from "@/utils/weatherCodeToIcon";
import { useSWRConfig } from "swr";
import axios from "axios";
import { useCallback } from "react";

const fetchWeather = async (city: string) => {
  const res = await axios.get(`/api/weather?city=${encodeURIComponent(city)}`);
  if (res.status !== 200) throw new Error("api-error");
  return res.data;
};

export const useWeatherSearch = () => {
  const { setCity, setLoading, setError } = useWeather();

  const { cache, mutate } = useSWRConfig();

  const handleSearch = useCallback(
    async (city: string) => {
      if (!city.trim()) {
        setError("Please enter a city name.");
        return;
      }

      const cacheKey = `weather:${city}`;
      const cached = cache.get(cacheKey);

      setLoading(true);
      setError(null);
      try {
        let data = cached?.data;
        if (!data) {
          data = await fetchWeather(city);
          mutate(cacheKey, data);
        }

        const hourlyIcons = data.hourly.time.map((_: number, i: number) => {
          const code = data.daily.weathercode[i] ?? data.daily.weathercode[0];
          return weatherCodeToIcon[code] || "/images/default-icon.webp";
        });

        setCity({
          city: data.city,
          country: data.country,
          temperature: data.current.temperature,
          humidity: data.current.humidity,
          windSpeed: data.current.windSpeed,
          perception: data.current.perception,
          daily: {
            highTemp: data.daily.temperature_2m_max,
            lowTemp: data.daily.temperature_2m_min,
            weatherIcons: data.daily.weathercode.map(
              (code: number) =>
                weatherCodeToIcon[code] || "/images/default-icon.webp"
            ),
          },
          hourly: {
            time: data.hourly.time,
            temperature: data.hourly.temperature_2m,
            weatherIcons: hourlyIcons,
          },
        });
      } catch (err) {
        console.error(err);
        setError("api-error");
      } finally {
        setLoading(false);
      }
    },
    [setCity, setLoading, setError, cache, mutate]
  );

  return { handleSearch };
};
