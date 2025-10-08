type weatherForecastType = {
  day: string;
  img: string;
  higestTemp: string;
  lowestTemp: string;
};

export const WeatherForecast = ({
  day,
  img,
  higestTemp,
  lowestTemp,
}: weatherForecastType) => {
  return (
    <div className="w-full xl:w-[100.57px] px-2.5 py-4 bg-[#262540] rounded-xl text-center border-inline">
      <p className="text-lg font-[500] font-DM-Sans">{day}</p>
      <img src={img} alt="icon-overcast" />
      <div className="flex items-center justify-between text-[16px] font-[500] font-DM-Sans">
        <span className="">{higestTemp}</span>
        <span className="text-[#D4D3D9]">{lowestTemp}</span>
      </div>
    </div>
  );
};
