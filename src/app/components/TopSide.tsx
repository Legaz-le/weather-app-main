"use client";

import logo from "../../../public/images/logo.svg";
import icon from "../../../public/images/icon-units.svg";
import dropdown from "../../../public/images/icon-dropdown.svg";
import search from "../../../public/images/icon-search.svg";
import errorIcon from "../../../public/images/icon-error.svg";
import retry from "../../../public/images/icon-retry.svg";
import { useState, useRef, useEffect } from "react";
import { DropDown } from "./BodyElements/Boxes/DropDown";
import { OptionData } from "../../mockData/data";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useWeatherSearch } from "@/hooks/useWeatherSearch";
import Image from "next/image";
import { useUnit } from "@/context/UnitContext";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "@/context/WeatherContext";

export const TopSide = () => {
  const { toggleUnitMode, unitMode } = useUnit();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([
    "London",
    "Paris",
    "Tokyo",
    "New York",
    "Berlin",
  ]);
  const { handleSearch } = useWeatherSearch();
  const { error } = useWeather();

  const unitDropdownRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useOutsideClick(unitDropdownRef, () => setIsOpen(false));
  useOutsideClick(searchBoxRef, () => setFocused(false));

  useEffect(() => {
    localStorage.setItem("unitMode", unitMode);
  }, [unitMode]);

  useEffect(() => {
    const newSelections: Record<string, string> = {};
    OptionData.forEach((data) => {
      const matchedOption =
        data.options.find((opt) =>
          unitMode === "metric"
            ? opt.includes("C") || opt.includes("m/s") || opt.includes("mm")
            : opt.includes("F") || opt.includes("mph") || opt.includes("in")
        ) || data.options[0];
      newSelections[data.title] = matchedOption;
    });
    setSelectedOptions(newSelections);
  }, [unitMode]);

  return (
    <div className="mb-12 flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <Image src={logo} alt="logo-icon" />
        <div ref={unitDropdownRef} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="font-dm btn-neutral focus:ring-Neutral-0  flex items-center gap-2.5 focus:ring-1 focus:ring-offset-1 sm:px-4 sm:py-3"
          >
            <Image src={icon} alt="icon-units" />
            Units
            <Image src={dropdown} alt="icon-dropDrown" />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-Neutral-800 border-inline absolute top-full right-0 z-10 mt-2 flex w-[214px] flex-col gap-1 rounded-xl px-2 py-1.5 text-start shadow-lg"
              >
                <p
                  onClick={toggleUnitMode}
                  className="font-dm px-2 py-2.5 text-[16px] font-medium hover:bg-Neutral-600 rounded-xl cursor-pointer"
                >
                  {unitMode === "metric"
                    ? "Switch to imperial"
                    : "Switch to metric"}
                </p>
                {OptionData.map((data, index) => (
                  <div
                    key={`${data.key}-${index}`}
                    className="flex flex-col gap-1"
                  >
                    <DropDown
                      title={data.title}
                      options={data.options}
                      selectedOption={selectedOptions[data.title]}
                    />
                    {index < OptionData.length - 1 && index < 2 && (
                      <hr className="border-Neutral-500 border-0.5 w-full border-[#3C3B5E]" />
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {error === "city-not-found" ? (
        <div className="flex flex-col justify-center text-center items-center gap-3">
          <Image src={errorIcon} alt="error-icon" />
          <p>Somethin went wrong</p>
          <p>
            We couldn’t connect to the server (API error). Please try again in a
            few moments.
          </p>
          <button className="flex gap-2">
            <Image src={retry} alt="retry-icon" width={0} height={0} />
            Retry
          </button>
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center">
          <h1 className="headline font-family ">
            How&apos;s the sky looking today?
          </h1>

          <div
            ref={searchBoxRef}
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
              <AnimatePresence>
                {focused && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="dropdown-box border-inline"
                  >
                    {history.slice(0, 5).map((item, index) => (
                      <p
                        key={index}
                        className="hover:bg-Neutral-700 cursor-pointer rounded-lg px-2 py-2 text-white"
                        onClick={() => {
                          setInputValue(item);
                          setFocused(false);
                        }}
                      >
                        {item}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="btn-primary w-full sm:w-[120px]"
              onClick={() => handleSearch(inputValue)}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
