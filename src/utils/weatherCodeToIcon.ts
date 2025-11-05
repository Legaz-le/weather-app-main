 export const getWeatherIcon = (code: number, hour: number): string => {
  const isNight = hour >= 18 || hour < 6;
  if (code === 0 || code === 1) {
    return isNight ? "/images/icon-overcast.webp" : "/images/icon-sunny.webp";
  }
  if (code === 2) {
    return isNight ? "/images/icon-overcast.webp" : "/images/icon-partly-cloudy.webp";
  }

  return weatherCodeToIcon[code] || "/images/default-icon.webp";
};
 
 export const weatherCodeToIcon: Record<number, string> = {
  0: "/images/icon-sunny.webp",      
  1: "/images/icon-sunny.webp",      
  2: "/images/icon-partly-cloudy.webp", 
  3: "/images/icon-overcast.webp",  
  45: "/images/icon-fog.webp",       
  48: "/images/icon-fog.webp",       
  51: "/images/icon-drizzle.webp",   
  53: "/images/icon-drizzle.webp",   
  55: "/images/icon-drizzle.webp",   
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
  99: "/images/icon-storm.webp" 
};
