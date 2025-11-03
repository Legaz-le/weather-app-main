import { useWeather } from "@/context/WeatherContext";
import { weatherCodeToIcon } from "@/utils/weatherCodeToIcon";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("api-error");
  return res.json();
};

export const useWeatherSearch = () => {
  const { setCity, setLoading, setError } = useWeather();
  const { mutate } = useSWRConfig();

  const { trigger: fetchWeather } = useSWRMutation(
    "/api/weather",
    async (_key, { arg : city}: {arg: string })  => {
      return fetcher(`/api/weather?city=${encodeURIComponent(city)}`);
    }
  )

  const handleSearch = useCallback(
    async (city: string, setInput: (val: string) => void) => {
      if (!city.trim()) {
        setError("Please enter a city name.");
        return;
      }

      setLoading(true);
      setError(null);

      const cacheKey = `weather:${city.toLowerCase()}`;
      try {
        const cachedRaw =  sessionStorage.getItem(cacheKey);

        if (cachedRaw) {
          const parsed = JSON.parse(cachedRaw);
          setCity(parsed);
          setLoading(false);
          fetchWeather(city).then((fresh) => {
            if(fresh) {
              mutate(cacheKey, fresh, false);
              sessionStorage.setItem(cacheKey, JSON.stringify(fresh));
              setCity(fresh);
            }
          }).catch(()=> {});
          return
        }
        const data = await fetchWeather(city);

        const hourlyIcons = data.hourly.time.map((_: string, i: number) => {
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

        setInput("");
      } catch (err) {
        console.error(err);
        setError("api-error");
      } finally {
        setLoading(false);
      }
    },
    [setCity, setLoading, setError, fetchWeather, mutate]
  );

  return { handleSearch };
};
