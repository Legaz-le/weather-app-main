import drizzle_icon from "/images/icon-drizzle.webp";

export const HourForecast = () => {
  return (
    <div className="flex justify-between items-center w-full bg-[#302F4A] p-forDailyForecast rounded-lg border-inline">
      <div className="flex flex-row items-center gap-3">
        <img src={drizzle_icon} alt="drizzle_icon" className="w-[40px] h-[40px]" />
        <span className="text-xl font-DM-Sans font-[500] ">3 PM</span>
      </div>
      <span className="text-[16px] font-DM-Sans font-[500]">20°</span>
    </div>
  );
};
