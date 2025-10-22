 export const weatherCodeToIcon: Record<number, string> = {
  0: "/images/icon-sunny.webp",
  1: "/images/icon-partly-cloudy.webp",
  2: "/images/icon-overcast.webp",
  3: "/images/icon-fog.webp",
  45: "/images/icon-drizzle.webp",
  48: "/images/icon-drizzle.webp",
  51: "/images/icon-rain.webp",
  53: "/images/icon-rain.webp",
  55: "/images/icon-rain.webp",
  61: "/images/icon-rain.webp",
  63: "/images/icon-rain.webp",
  65: "/images/icon-rain.webp",
  71: "/images/icon-snow.webp",
  73: "/images/icon-snow.webp",
  75: "/images/icon-snow.webp",
  80: "/images/icon-rain.webp",
  81: "/images/icon-rain.webp",
  82: "/images/icon-rain.webp",
  95: "/images/icon-storm.webp",
  96: "/images/icon-storm.webp",
  99: "/images/icon-storm.webp",
};

export function formatHour(timeString: string) {
  const date = new Date(timeString);
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12; 
  return `${hour12} ${ampm}`;
}