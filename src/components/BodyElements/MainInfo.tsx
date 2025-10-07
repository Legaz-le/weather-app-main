import bg from "/images/bg-today-large.svg";
import { WeatherInfo } from "./Boxes/weatherInfo";

export const MainInfo = () => {
  return (
    <div className="flex flex-col gap-8   mb-12 mr-8 relative">
      <img src={bg} alt="blue-background"  className="absloute"/>
      <WeatherInfo />
    </div>
  );
};
