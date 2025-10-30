import { useWeather } from "@/context/WeatherContext";
import { weatherCodeToIcon } from "@/utils/weatherCodeToIcon";
import axios from "axios";

export const useWeatherSearch = () => {
  const { setCity, setLoading } = useWeather();

  const handleSearch = async (city: string) => {
    setLoading(true);
    try {
      const response = await axios(`/api/weather?city=${encodeURIComponent(city)}`);
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
            (code: number) => weatherCodeToIcon[code] || "/images/default-icon.webp"
          ),
        },
        hourly: {
          time: data.hourly.time,
          temperature: data.hourly.temperature_2m,
          weatherIcons: hourlyIcons,
        },
      });
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  return { handleSearch };
};