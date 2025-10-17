import logo from "/images/logo.svg";
import icon from "/images/icon-units.svg";
import dropdown from "/images/icon-dropdown.svg";
import search from "/images/icon-search.svg";
import { useState, useRef } from "react";
import { DropDown } from "./BodyElements/Boxes/DropDown";
import { OptionData } from "../mockData/data";
import { useOutsideClick } from "../hooks/useOutsideClick";

export const TopSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const historyItem = "London";

  useOutsideClick(containerRef, () => setFocused(false));

  const handleSelect = (title: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [title]: option }));
  };

  return (
    <div className="flex flex-col w-full mb-12">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <img src={logo} alt="logo-icon" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center font-dm gap-2.5 btn-neutral sm:px-4 sm:py-3 focus:ring-1 focus:ring-Neutral-0 focus:ring-offset-1"
        >
          <img src={icon} alt="icon-units" />
          Units
          <img src={dropdown} alt="icon-dropDrown" />
          {isOpen && (
            <div className="absolute text-start top-full right-0 mt-2 flex flex-col bg-Neutral-800 rounded-xl shadow-lg px-2 py-1.5 w-[214px] z-10 gap-1 border-inline">
              <p className="font-dm font-medium text-[16px] px-2 py-2.5">Switch to imperial</p>
              {OptionData.map((data, index) => (
                <div key={data.key} className="flex flex-col gap-1">
                  <DropDown
                    title={data.title}
                    options={data.options}
                    selectedOption={selectedOptions[data.title]}
                    onSelect={(option) => handleSelect(data.title, option)}
                  />
                  {index < OptionData.length - 1 && index < 2 && (
                    <hr className="border-Neutral-500 w-full border-0.5 border-[#3C3B5E]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center mt-16">
        <h1 className="headline font-d">How's the sky looking today?</h1>

        <div ref={containerRef} className="flex items-center justify-center flex-col sm:flex-row mt-16 w-full gap-4">
          <div className="input-container w-full xl:w-[526px]">
            <img src={search} alt="search-icon" />
            <input
              type="search"
              placeholder="Search for the place.."
              className="border-none bg-transparent font-medium text-white focus:outline-none placeholder:text-xl w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setFocused(true)}
            />

            {focused && (
              <div className="dropdown-box border-inline">
                <p
                  className="px-2 py-2 rounded-lg hover:bg-Neutral-700 cursor-pointer text-white"
                  onClick={() => {
                    setInputValue(historyItem);
                    setFocused(false);
                  }}
                >
                  {historyItem}
                </p>
              </div>
            )}
          </div>

          <button className="btn-primary w-full sm:w-[120px]">Search</button>
        </div>
      </div>
    </div>
  );
};