"use client";

import { useWeather } from "@/context/WeatherContext";
import { BottomTable } from "./BodyElements/BottomTable";
import { MainInfo } from "./BodyElements/MainInfo";
import { SideTable } from "./BodyElements/SideTable";
import { motion, AnimatePresence } from "framer-motion";

export const MainBody = () => {
  const { error } = useWeather();
  return (
    <div className="flex w-full flex-col justify-center gap-8 lg:flex-row">
      {error ? (
        <AnimatePresence>
          <motion.div
            className=" font-[700] text-[28px]"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 1 }}
          >
            No search result found!
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          <div className="w-full flex-col">
            <MainInfo />
            <BottomTable />
          </div>
          <div className="w-full">
            <SideTable />
          </div>
        </>
      )}
    </div>
  );
};
