import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useWeatherSuggestion } from "@/hooks/useCitySuggestions";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useWeatherSearch } from "@/hooks/useWeatherSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { HistoryOfCities } from "../../Shared/HistoryOfCities";
import { useWeather } from "@/context/WeatherContext";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { HeadlineText } from "./HeadlineText";
import { gsap } from "gsap";

export const SearchBar = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const { handleSearch } = useWeatherSearch();
  const { loading, city } = useWeather();

  const { handleCities } = useWeatherSuggestion(
    setSearchLoading,
    setSuggestions
  );
  const { searchedCities, addCity } = useSearchHistory();

  const debouncedInput = useDebounce(inputValue, 300);
  useOutsideClick(searchBoxRef, () => setFocused(false));

  useEffect(() => {
    if (debouncedInput.trim()) {
      handleCities(debouncedInput);
    } else {
      setSuggestions([]);
    }
  }, [debouncedInput]);

  useEffect(() => {
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
  }, [searchedCities]);

  useEffect(() => {
    const defaultCity = "London";
    handleSearch(defaultCity);
  }, []);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const cityToSearch = selectedCity || inputValue;
        handleSearch(cityToSearch);
        addCity(city?.city || cityToSearch);
        setInputValue("");
      }}
      className="mt-16 flex flex-col items-center justify-center"
    >
        <HeadlineText />
      <div
        ref={searchBoxRef}
        className="mt-16 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <div className="input-container w-full xl:w-[536px]">
          <Image
            src="/images/icon-search.svg"
            alt="search-icon"
            width={20}
            height={20}
          />
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
          disabled={loading}
          onMouseEnter={() =>
            gsap.to(btnRef.current, { scale: 1.05, duration: 0.2 })
          }
          onMouseLeave={() =>
            gsap.to(btnRef.current, { scale: 1, duration: 0.2 })
          }
          className="btn-primary w-full sm:w-[120px]"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <motion.div
                className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
              />
              <span>Loading...</span>
            </div>
          ) : (
            "Search"
          )}
        </button>
      </div>
      <AnimatePresence mode="wait">
        <div className="flex w-full xl:w-[675px] mt-5">
          {loading ? (
            <div className="w-full">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="px-10 py-5 rounded-2xl bg-Neutral-700 bg-[length:200%_100%] animate-shimmer mr-8.5"
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
  );
};
