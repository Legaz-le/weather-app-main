type HourForecastType = {
  img: string;
  hour: string;
  temp: string;
};

export const HourForecast = ({ img, hour, temp }: HourForecastType) => {
  return (
    <div className="flex justify-between items-center w-full bg-[#302F4A]  p-forDailyForecast rounded-lg border-inline">
      <div className="flex flex-row items-center gap-3">
        <img src={img} alt="drizzle_icon" className="w-[40px] " />
        <span className="text-xl font-DM-Sans font-[500] ">{hour}</span>
      </div>
      <span className="text-[16px] font-DM-Sans font-[500]">{temp}</span>
    </div>
  );
};
