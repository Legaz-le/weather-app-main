"use client";

import Image from "next/image";
import { useWeather } from "@/context/WeatherContext";
import { Header } from "./TopElements/Header";
import { SearchBar } from "./TopElements/SearchBar";

export const TopSide = () => {
  const { error } = useWeather();

  return (
    <div className="mb-12 flex w-full flex-col">
      <Header />
      {error === "city-not-found" ? (
        <div className="flex flex-col justify-center text-center items-center gap-3">
          <Image src="/images/icon-error.svg" alt="error-icon" />
          <p>Something went wrong</p>
          <p>
            We couldn’t connect to the server (API error). Please try again in a
            few moments.
          </p>
          <button className="flex gap-2.5 font-Awesome text-[16px] px-4 py-3 rounded-lg bg-[#262540] hover:bg-Neutral-700 cursor-pointer">
            <Image src="/images/icon-retry.svg" alt="retry-icon" />
            Retry
          </button>
        </div>
      ) : (
        <SearchBar />
      )}
    </div>
  );
};
