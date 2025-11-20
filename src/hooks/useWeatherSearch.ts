import { useWeather } from "@/context/WeatherContext";
import { weatherCodeToIcon } from "@/utils/weatherCodeToIcon";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("api-error");
  return res.json();
};

export const useWeatherSearch = () => {
  const { setCity, setLoading, setError } = useWeather();
  const { mutate } = useSWRConfig();

  const { trigger: fetchWeather } = useSWRMutation(
    "/api/weather",
    async (
      _key,
      { arg }: { arg: { city?: string; lat?: number; lon?: number } }
    ) => {
      let url = "/api/weather";

      if (arg.lat && arg.lon) {
        url += `?lat=${arg.lat}&lon=${arg.lon}`;
      } else if (arg.city) {
        url += `?city=${encodeURIComponent(arg.city)}`;
      } else {
        throw new Error("invalid-params");
      }

      return fetcher(url);
    }
  );

  const handleSearch = useCallback(
    async (city?: string, lat?: number, lon?: number) => {
      if (!city && (!lat || !lon)) {
        setError("Please enter a city name.");
        return null;
      }

      setLoading(true);
      setError(null);

      const cacheKey =
        lat && lon ? `weather:${lat},${lon}` : `weather:${city!.toLowerCase()}`;
      try {
        const cachedRaw = sessionStorage.getItem(cacheKey);

        if (cachedRaw) {
          const parsed = JSON.parse(cachedRaw);
          setCity(parsed);
          setLoading(false);
          fetchWeather({ city })
            .then((fresh) => {
              if (fresh) {
                mutate(cacheKey, fresh, false);
                const hourlyIcons = fresh.hourly.weathercode.map(
                  (code: number) =>
                    weatherCodeToIcon[code] || "/images/default-icon.webp"
                );

                const weatherData = {
                  city: fresh.city,
                  country: fresh.country,
                  current: {
                    temperature: fresh.current.temperature,
                    humidity: fresh.current.humidity,
                    windSpeed: fresh.current.windSpeed,
                    perception: fresh.current.perception,
                  },
                  daily: {
                    highTemp: fresh.daily.temperature_2m_max,
                    lowTemp: fresh.daily.temperature_2m_min,
                    weatherIcons: fresh.daily.weathercode.map(
                      (code: number) =>
                        weatherCodeToIcon[code] || "/images/default-icon.webp"
                    ),
                  },
                  hourly: {
                    time: fresh.hourly.time,
                    temperature: fresh.hourly.temperature_2m,
                    weatherIcons: hourlyIcons,
                    weathercode: fresh.hourly.weathercode,
                  },
                };

                sessionStorage.setItem(cacheKey, JSON.stringify(weatherData));
                setCity(weatherData);
              }
            })
            .catch(() => {});
          return parsed.city;
        }
        const data = await fetchWeather({ city, lat, lon });

        const hourlyIcons = data.hourly.weathercode.map(
          (code: number) =>
            weatherCodeToIcon[code] || "/images/default-icon.webp"
        );

        setCity({
          city: data.city,
          country: data.country,
          current: {
            temperature: data.current.temperature,
            humidity: data.current.humidity,
            windSpeed: data.current.windSpeed,
            perception: data.current.perception,
          },
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
            weathercode: data.hourly.weathercode,
          },
        });
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
