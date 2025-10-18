type MainInfoType = {
  Name: string;
  number: string;
};

export const WeatherInfo = ({ Name, number }: MainInfoType) => {
  return (
    <div className="border-inline flex w-full flex-col justify-start gap-6 rounded-xl bg-[#262540] p-5">
      <p className="text-lg leading-[120%] font-[500] text-[#D4D3D9]">
        {Name}
      </p>
      <span className="text-[32px] leading-[100%] font-[300]">
        {number}
      </span>
    </div>
  );
};
