import weatherIcon from "/images/icon-overcast.webp"

export const WeatherForecast = () => {
  return (
    <div className="w-[100.57px] h-[165px] px-2.5 py-4 bg-[#262540] rounded-xl text-center border-inline">
        <p className="text-lg font-[500] font-DM-Sans">Tue</p>
        <img src={weatherIcon} alt="icon-overcast" />
        <div className="flex items-center justify-between text-[16px] font-[500] font-DM-Sans">
            <span className="">
                20°
            </span>
            <span className="text-[#D4D3D9]">
                14°
            </span>
        </div>
    </div>
  )
}
