export interface WeatherInfoProps {
  Name: string;
}

export interface HourForecastProps {
  img: string;
  hour: string;
  temp: number;
}

export interface WeatherForecastProps {
  day: string;
  img: string;
  highestTemp: number;
  lowestTemp: number;
}

export interface DropDownProps {
  title: string;
  options: string[];
  selectedOption?: string;
}