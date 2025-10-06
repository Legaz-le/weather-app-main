import bg from "../../public/images/bg-today-large.svg";
import { WeatherInfo } from "./Boxes/weatherInfo";

export const MainInfo = () => {
  return (
    <div className="flex flex-col gap-8   mb-12 mr-5">
      <img src={bg} alt="blue-background" />
      <WeatherInfo />
    </div>
  );
};
