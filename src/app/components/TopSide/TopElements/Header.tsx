"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DropDown } from "../../MainBody/BodyElements/Boxes/DropDown";
import { useUnit } from "@/context/UnitContext";
import { useUnitPreference } from "@/hooks/useUnitPreference";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { OptionData } from "@/mockData/data";
import { useWeather } from "@/context/WeatherContext";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const unitDropdownRef = useRef<HTMLDivElement>(null);

  const { toggleUnitMode, unitMode } = useUnit();

  const unitPreferences = useUnitPreference(unitMode);

  useOutsideClick(unitDropdownRef, () => setIsOpen(false));
  const { loading } = useWeather();

  return (
    <div className="flex w-full items-center justify-between">
      <Image src="/images/logo.svg" alt="logo-icon" width={220} height={100} />
      <div ref={unitDropdownRef} className="relative">
        <motion.button
          disabled={loading}
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
            <>
              <Image
                src="/images/icon-units.svg"
                alt="icon-units"
                width={20}
                height={20}
              />
              Units
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Image
                  src="/images/icon-dropdown.svg"
                  alt="icon-dropdown"
                  width={16}
                  height={16}
                />
              </motion.div>
            </>
          )}
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
                    selectedOption={unitPreferences[data.title]}
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
  );
};
