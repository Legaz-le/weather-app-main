import { useWeather } from "@/context/WeatherContext";
import { weatherCodeToIcon } from "@/utils/weatherCodeToIcon";
import axios from "axios";

export const useWeatherSearch = () => {
  const { setCity, setLoading, setError  } = useWeather();

  const handleSearch = async (city: string) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios(
        `/api/weather?city=${encodeURIComponent(city)}`
      );

      if (!response.status) {
        if (response.status === 404) {
          
          setError("city-not-found");
        } else {
          
          setError("api-error");
        }
        return;
      }

      const data = response.data;
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
  };

  return { handleSearch };
};
