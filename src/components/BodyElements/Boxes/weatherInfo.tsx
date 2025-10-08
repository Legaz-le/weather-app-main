type MainInfoType = {
  Name: string;
  number: string;
};

export const WeatherInfo = ({ Name, number }: MainInfoType) => {
  return (
    <div className="flex flex-col justify-start p-5 gap-6 bg-[#262540] w-[182px] h-[118px] rounded-xl border-inline">
      <p className="font-DM-Sans text-lg font-[500] text-[#D4D3D9] leading-[120%]">
        {Name}
      </p>
      <span className="text-[32px] font-DM-Sans font-[300] leading-[100%]">
        {number}
      </span>
    </div>
  );
};
