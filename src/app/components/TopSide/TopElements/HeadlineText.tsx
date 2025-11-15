import { useState, useEffect } from "react";
import { useAnimatedHeadline } from "@/hooks/useAnimatedHeadline";
import { useWeather } from "@/context/WeatherContext";

export const HeadlineText = () => {
  const [inputValueUse, setValueUse] = useState<string>("");
  const { city, error } = useWeather();

  const headlineText =
    inputValueUse && error
      ? "How's the sky looking today?"
      : `How's weather in ${inputValueUse}?`;
  const textRef = useAnimatedHeadline(headlineText);

  useEffect(() => {
    setValueUse(city?.city ?? "");
  }, [city]);

  return (
    <div ref={textRef} className="headline font-family">
      {headlineText}
    </div>
  );
};
