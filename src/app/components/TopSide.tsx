"use client";

import logo from "../../../public/images/logo.svg";
import icon from "../../../public/images/icon-units.svg";
import dropdown from "../../../public/images/icon-dropdown.svg";
import search from "../../../public/images/icon-search.svg";
import errorIcon from "../../../public/images/icon-error.svg";
import retry from "../../../public/images/icon-retry.svg";
import { useState, useRef, useEffect } from "react";
import { DropDown } from "./BodyElements/Boxes/DropDown";
import { OptionData } from "@/mockData/data";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useWeatherSearch } from "@/hooks/useWeatherSearch";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useUnit } from "@/context/UnitContext";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "@/context/WeatherContext";
import { useWeatherSuggestion } from "@/hooks/useCitySuggestions";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { HistoryOfCities } from "./Shared/HistoryOfCities";

gsap.registerPlugin(SplitText, useGSAP);

export const TopSide = () => {
  const { toggleUnitMode, unitMode } = useUnit();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValueUse, setValueUse] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchedCities, setSearchedCities] = useState<string[]>([]);

  const { handleSearch } = useWeatherSearch();
  const { handleCities } = useWeatherSuggestion(
    setSearchLoading,
    setSuggestions
  );
  const debouncedInput = useDebounce(inputValue, 300);

  const { error, city, loading } = useWeather();
  const textAccess = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const split = new SplitText(textAccess.current, { type: "words" });
    gsap.from(split.words, {
      opacity: 0,
      stagger: 0.1,
      duration: 7,
      ease: "power2.out",
    });

    return () => split.revert();
  }, [inputValueUse]);

  const unitDropdownRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useOutsideClick(unitDropdownRef, () => setIsOpen(false));
  useOutsideClick(searchBoxRef, () => setFocused(false));

  useEffect(() => {
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
  }, [searchedCities]);

  useEffect(() => {
    const defaultCity = "London";
    handleSearch(defaultCity);
  }, []);

  useEffect(() => {
    const savedUnit = localStorage.getItem("unitMode");
    if (savedUnit) {
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
    } else {
      setSelectedOptions({});
    }
  }, [unitMode]);

  useEffect(() => {
    setValueUse(city?.city ?? "");
  }, [city]);

  useEffect(() => {
    if (debouncedInput.trim()) {
      handleCities(debouncedInput);
    } else {
      setSuggestions([]);
    }
  }, [debouncedInput]);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const gradient = gsap.timeline({ paused: true }).to(btn, {
      backgroundPosition: "200% center",
      duration: 1.5,
      ease: "power2.inOut",
    });

    btn.addEventListener("mouseenter", () => gradient.play());
    btn.addEventListener("mouseleave", () => gradient.reverse());
  }, []);

  return (
    <div className="mb-12 flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <Image src={logo} alt="logo-icon" />
        <div ref={unitDropdownRef} className="relative">
          <motion.button
            role="button"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{
              y: -3,
              boxShadow: "0 4px 12px rgba(255,255,255,0.15)",
            }}
            whileTap={{
              scale: 0.97,
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="btn-gradient font-dm flex items-center gap-2.5 sm:px-4 sm:py-3 rounded-xl text-white focus:ring-1 focus:ring-offset-1 focus:ring-Neutral-0 cursor-pointer"
          >
            <Image src={icon} alt="icon-units" width={20} height={20} />
            Units
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={dropdown}
                alt="icon-dropdown"
                width={16}
                height={16}
              />
            </motion.div>
          </motion.button>
          <AnimatePresence mode="wait">
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
          <p>Something went wrong</p>
          <p>
            We couldn’t connect to the server (API error). Please try again in a
            few moments.
          </p>
          <button className="flex gap-2.5 font-Awesome text-[16px] px-4 py-3 rounded-lg bg-[#262540] hover:bg-Neutral-700 cursor-pointer">
            <Image src={retry} alt="retry-icon" />
            Retry
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(selectedCity || inputValue);
            setSearchedCities((prev) => {
              const newCity = city?.city?.trim();
              if (!newCity) return prev;
              const filtered = prev.filter(
                (c) => c.toLowerCase() !== newCity.toLowerCase()
              );
              const updated = [...filtered, newCity];
              return updated.slice(-5);
            });
            setInputValue("");
          }}
          className="mt-16 flex flex-col items-center justify-center"
        >
          <div ref={textAccess} className="headline font-family">
            {inputValueUse && error
              ? "How’s the sky looking today?"
              : `How’s weather in ${inputValueUse}?`}
          </div>

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
                onChange={(e) => {
                  const typed = e.target.value;
                  setInputValue(typed);
                  setSelectedCity("");
                  setFocused(true);
                }}
                required
              />
              <AnimatePresence mode="wait">
                {focused && (searchLoading || suggestions.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="dropdown-box border-inline"
                  >
                    {searchLoading ? (
                      <div className="flex flex-col gap-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="h-10 w-full rounded-lg bg-Neutral-700 bg-[length:200%_100%] animate-shimmer"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              delay: i * 0.15,
                              duration: 0.5,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      suggestions.map((item, index) => (
                        <p
                          key={index}
                          className="hover:bg-Neutral-700 cursor-pointer rounded-lg px-2 py-2 text-white"
                          onClick={() => {
                            setInputValue(item);
                            setSelectedCity(item);
                            setFocused(false);
                          }}
                        >
                          {item}
                        </p>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              ref={btnRef}
              type="submit"
              onMouseEnter={() =>
                gsap.to(btnRef.current, { scale: 1.05, duration: 0.2 })
              }
              onMouseLeave={() =>
                gsap.to(btnRef.current, { scale: 1, duration: 0.2 })
              }
              className="btn-primary w-full sm:w-[120px]"
            >
              Search
            </button>
          </div>
          <AnimatePresence mode="wait">
            <div className="flex w-full xl:w-[680px] mt-5">
              {loading ? (
                <div className="w-full">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="px-13 py-5 rounded-2xl bg-Neutral-700 bg-[length:200%_100%] animate-shimmer mr-9.5"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: i * 0.15,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                searchedCities.map((item) => (
                  <HistoryOfCities key={item} savedCities={item} />
                ))
              )}
            </div>
          </AnimatePresence>
        </form>
      )}
    </div>
  );
};
