import Image from "next/image";

type weatherForecastType = {
  day: string;
  img: string;
  highestTemp: string;
  lowestTemp: string;
};

export const WeatherForecast = ({
  day,
  img,
  highestTemp,
  lowestTemp,
}: weatherForecastType) => {
  return (
    <div className="border-inline w-full  rounded-xl flex flex-col items-center bg-[#262540] px-2.5 py-4 text-center xl:w-[100.57px]">
      <p className=" text-lg font-[500]">{day}</p>
      <Image
        src={img}
        alt="icon-overcast"
        width={64}
        height={64}
        className="object-cover xl:py-2"
      />
      <div className="flex items-center justify-between w-full  text-[16px] font-[500]">
        <span className="">{highestTemp}</span>
        <span className="text-[#D4D3D9]">{lowestTemp}</span>
      </div>
    </div>
  );
};
