import { useWeather } from "@/context/WeatherContext";
import { getWeatherIcon } from "@/utils/weatherCodeToIcon";

export const useFilteredHours = (selectedDay: string) => {
  const { city } = useWeather();

  const filteredHours = (city?.hourly?.time || [])
    .map((time, index) => {
      const dateInCity = new Date(
        new Intl.DateTimeFormat("en-US", {
          timeZone: city?.timezone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(time))
      );

      const hour = dateInCity.getHours();
      const weatherCode = city?.hourly?.weathercode?.[index] ?? 0;
      const icon = getWeatherIcon(weatherCode, hour);

      return {
        time: dateInCity,
        temp: city?.hourly?.temperature?.[index] ?? 0,
        icon,
        dayName: new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          timeZone: city?.timezone,
        }).format(dateInCity),
      };
    })
    .filter((hour) => {
      if (!hour.time) return false;

      const nowInCity = new Date(
        new Intl.DateTimeFormat("en-US", {
          timeZone: city?.timezone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date())
      );

      const todayInCity = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone: city?.timezone,
      }).format(nowInCity);

      if (selectedDay === todayInCity) {
        const nextDayNoon = new Date(nowInCity);
        nextDayNoon.setDate(nowInCity.getDate() + 1);
        nextDayNoon.setHours(12, 0, 0, 0);
        return hour.time >= nowInCity && hour.time <= nextDayNoon;
      } else {
        const selectedDayIndex = weekDays.indexOf(selectedDay);
        const dayStart = new Date(nowInCity);
        const dayDiff = (selectedDayIndex - nowInCity.getDay() + 7) % 7;
        dayStart.setDate(nowInCity.getDate() + dayDiff);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 99);

        return hour.time >= dayStart && hour.time <= dayEnd;
      }
    });
  return { filteredHours };
};
