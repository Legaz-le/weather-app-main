"use client";

import logo from "../../../public/images/logo.svg";
import icon from "../../../public/images/icon-units.svg";
import dropdown from "../../../public/images/icon-dropdown.svg";
import search from "../../../public/images/icon-search.svg";
import { useState, useRef } from "react";
import { DropDown } from "./BodyElements/Boxes/DropDown";
import { OptionData } from "../../mockData/data";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { weatherCodeToIcon } from "../../utils/weatherCodeToIcon";
import Image from "next/image";
import { useWeather } from "../../context/WeatherContext";
import axios from "axios";

export const TopSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCity } = useWeather();

  const historyItem = "London";

  useOutsideClick(containerRef, () => setFocused(false));

  const handleSelect = (title: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [title]: option }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios(`/api/weather?city=${encodeURIComponent(inputValue)}`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      console.log("Weather data:", data);
      setCity({
        city: data.city,
        country: data.country,
        temperature: data.current.temperature,
        humidity: data.current.humidity,
        windSpeed: data.current.windSpeed,
        perception: data.current.perception,
        daily: {
          highTemp: data.daily.temperature_2m_max,
          lowTemp: data.daily.temperature_2m_min,
          weatherIcons: data.daily.weathercode.map(
            (code: number) => weatherCodeToIcon[code] || "/images/default-icon.webp"
          ),
        },
        hourly : {
          time: data.hourly.time,
          temperature: data.hourly.temperature_2m,
          weatherIcons: data.daily.weathercode.map(
            (code: number) => weatherCodeToIcon[code] || "/images/default-icon.webp"
          ),
        }
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="mb-12 flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <Image src={logo} alt="logo-icon" width={0} height={0} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-dm btn-neutral focus:ring-Neutral-0 relative flex items-center gap-2.5 focus:ring-1 focus:ring-offset-1 sm:px-4 sm:py-3"
        >
          <Image src={icon} alt="icon-units" width={0} height={0} />
          Units
          <Image src={dropdown} alt="icon-dropDrown" width={0} height={0} />
          {isOpen && (
            <div className="bg-Neutral-800 border-inline absolute top-full right-0 z-10 mt-2 flex w-[214px] flex-col gap-1 rounded-xl px-2 py-1.5 text-start shadow-lg">
              <p className="font-dm px-2 py-2.5 text-[16px] font-medium">
                Switch to imperial
              </p>
              {OptionData.map((data, index) => (
                <div key={data.key} className="flex flex-col gap-1">
                  <DropDown
                    title={data.title}
                    options={data.options}
                    selectedOption={selectedOptions[data.title]}
                    onSelect={(option) => handleSelect(data.title, option)}
                  />
                  {index < OptionData.length - 1 && index < 2 && (
                    <hr className="border-Neutral-500 border-0.5 w-full border-[#3C3B5E]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </button>
      </div>

      <div className="mt-16 flex flex-col items-center justify-center">
        <h1 className="headline font-family ">
          How&apos;s the sky looking today?
        </h1>

        <div
          ref={containerRef}
          className="mt-16 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <div className="input-container w-full xl:w-[536px]">
            <Image src={search} alt="search-icon" />
            <input
              type="search"
              placeholder="Search for the place.."
              className="w-full border-none bg-transparent font-medium text-white placeholder:text-xl focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setFocused(true)}
            />

            {focused && (
              <div className="dropdown-box border-inline">
                <p
                  className="hover:bg-Neutral-700 cursor-pointer rounded-lg px-2 py-2 text-white"
                  onClick={() => {
                    setInputValue(historyItem);
                    setFocused(false);
                  }}
                >
                  {historyItem}
                </p>
              </div>
            )}
          </div>

          <button
            className="btn-primary w-full sm:w-[120px]"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
