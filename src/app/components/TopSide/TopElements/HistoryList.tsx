import { motion, AnimatePresence } from "framer-motion";
import { HistoryOfCities } from "./TopData/HistoryOfCities";

export const HistoryList = ({loading, cities}: {loading: boolean, cities: string[]}) => {
  return (
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
          cities.map((item) => (
            <HistoryOfCities key={item} savedCities={item} />
          ))
        )}
      </div>
    </AnimatePresence>
  );
};
