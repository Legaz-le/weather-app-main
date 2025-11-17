"use client";

import { useWeatherSearch } from "@/hooks/useWeatherSearch";
import { motion } from "framer-motion";
import Image from "next/image";

interface HistoryOfCitiesInterface {
  key: string;
  savedCities: string;
  deleteCity: (cityName: string) => void;
}

export const HistoryOfCities: React.FC<HistoryOfCitiesInterface> = ({
  savedCities,
  deleteCity,
}) => {
  const { handleSearch } = useWeatherSearch();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className=" mr-9.5 relative"
    >
      <button
        className="absolute -top-2 right-0 cursor-pointer"
        onClick={() => deleteCity(savedCities)}
        aria-label={`Delete ${savedCities} from history`}
      >
        <Image
          src="/images/icon-delete.png"
          alt="delete-icon"
          width={20}
          height={20}
          priority
        />
      </button>

      <h5
        onClick={() => handleSearch(savedCities)}
        className="p-3 bg-Neutral-900 rounded-2xl hover:bg-Blue-500 transition cursor-pointer"
      >
        {savedCities}
      </h5>
    </motion.div>
  );
};
