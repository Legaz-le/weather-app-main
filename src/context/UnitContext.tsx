"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UnitMode = "metric" | "imperial";

type UnitContextType = {
  unitMode: UnitMode;
  toggleUnitMode: () => void;
  setUnitMode: (mode: UnitMode) => void;
};

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider = ({ children }: { children: ReactNode }) => {
  const [unitMode, setUnitMode] = useState<UnitMode>("metric");

  useEffect(() => {
    const savedMode = localStorage.getItem("unitMode") as UnitMode | null;
    if (savedMode) setUnitMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("unitMode", unitMode);
  }, [unitMode]);

  const toggleUnitMode = () => {
    setUnitMode((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <UnitContext.Provider value={{ unitMode, toggleUnitMode, setUnitMode }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) throw new Error("useUnit must be used inside UnitProvider");
  return context;
};
