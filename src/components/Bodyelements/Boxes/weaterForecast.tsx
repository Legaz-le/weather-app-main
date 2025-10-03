import weatherIcon from "../../../public/images/icon-overcast.webp"

export const WeaterForecast = () => {
  return (
    <div className="w-[100.57px] h-[165px] bg-[#262540]">
        <p>Tue</p>
        <img src={weatherIcon} alt="icon-overcast" />
        <div>
            <span>
                20°
            </span>
            <span>
                14°
            </span>
        </div>
    </div>
  )
}
