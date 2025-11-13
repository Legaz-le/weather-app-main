export type UnitMode = "metric" | "imperial";

export type UnitContextType = {
  unitMode: UnitMode;
  toggleUnitMode: () => void;
  setUnitMode: (mode: UnitMode) => void;
};

export type WeatherErrorType =
  | "city-not-found"
  | "api-error"
  | "network-error"
  | "Please enter a city name."
  | null;

export interface CityLocation {
  city: string;
  country: string;
  timezone: string;
}


export interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  perception: number;  
}

export interface DailyForecast {
  highTemp: number[];
  lowTemp: number[];
  weatherIcons: string[];  
}

export interface HourlyForecast {
  time: string[];
  temperature: number[];
  weatherIcons: string[];  
  weathercode: number[];
}

export interface WeatherData {
 
  city: string;
  country: string;
  timezone: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  perception: number;  
  daily: DailyForecast;
  hourly: HourlyForecast;
}

export interface WeatherDataBetter {
  location: CityLocation;
  current: CurrentWeather;
  daily?: DailyForecast;
  hourly?: HourlyForecast;
}

export interface WeatherContextType {
  city: WeatherData | null;
  loading: boolean;
  error: WeatherErrorType;
  setCity: (data: WeatherData) => void;
  setLoading: (value: boolean) => void;
  setError: (error: WeatherErrorType) => void;
}
