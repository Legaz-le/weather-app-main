import Image from "next/image";

type HourForecastType = {
  img: string;
  hour: string;
  temp: string;
};

export const HourForecast = ({ img, hour, temp }: HourForecastType) => {
  return (
    <div className="p-forDailyForecast border-inline flex w-full items-center justify-between rounded-lg bg-[#302F4A]">
      <div className="flex flex-row items-center gap-3">
        <Image src={img} alt="drizzle_icon"  width={40} height={0}/>
        <span className=" text-xl font-[500]">{hour}</span>
      </div>
      <span className=" text-[16px] font-[500]">{temp}</span>
    </div>
  );
};
