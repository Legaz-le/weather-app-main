import { useWeatherSearch } from "@/hooks/useWeatherSearch";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryOfCitiesInterface {
  key: string;
  savedCities: string;
}

export const HistoryOfCities: React.FC<HistoryOfCitiesInterface> = ({
  savedCities,
}) => {
  const { handleSearch } = useWeatherSearch();
  return (
    <AnimatePresence mode="wait">
      <div className=" mr-9.5">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 2.5 }}
          whileHover={{
              y: -3,
              boxShadow: "0 4px 12px rgba(255,255,255,0.15)",
            }}
          className=" w-full flex cursor-pointer"
        >
          <h5
            onClick={() => handleSearch(savedCities)}
            className="p-3 bg-Neutral-900 rounded-2xl hover:bg-Blue-500 transition"
          >
            {savedCities}
          </h5>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
