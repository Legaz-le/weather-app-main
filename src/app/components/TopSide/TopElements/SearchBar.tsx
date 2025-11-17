import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useWeatherSuggestion } from "@/hooks/useCitySuggestions";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useWeatherSearch } from "@/hooks/useWeatherSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { useWeather } from "@/context/WeatherContext";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { HeadlineText } from "./HeadlineText";
import { SearchButton } from "./SearchButton";
import { SuggestionDropdown } from "./SuggestionDropdown";
import { HistoryList } from "./HistoryList";
import { useGeolocation } from "@/hooks/useGeolocation";

export const SearchBar = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);

  const { handleSearch } = useWeatherSearch();
  const { loading, city } = useWeather();

  const { handleCities } = useWeatherSuggestion(
    setSearchLoading,
    setSuggestions
  );
  const { searchedCities, addCity, deleteCity } = useSearchHistory();
  const { location, getLocation, error } = useGeolocation();

  const debouncedInput = useDebounce(inputValue, 300);
  useOutsideClick(searchBoxRef, () => setFocused(false));

  useEffect(() => {
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
  }, [searchedCities]);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      handleSearch(undefined, location.lat, location.lon);
    } else if (error) {
      handleSearch("London");
    }
  }, [location, error]);

  useEffect(() => {
    if (debouncedInput.trim()) {
      handleCities(debouncedInput);
    } else {
      setSuggestions([]);
    }
  }, [debouncedInput]);

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
          <SuggestionDropdown
            searchLoading={searchLoading}
            focused={focused}
            suggestions={suggestions}
            onSelect={(item) => {
              setInputValue(item);
              setSelectedCity(item);
              setFocused(false);
            }}
          />
        </div>

        <SearchButton loading={loading}>Search</SearchButton>
      </div>
      <HistoryList loading={loading} cities={searchedCities} deleteCity={deleteCity} />
    </form>
  );
};
