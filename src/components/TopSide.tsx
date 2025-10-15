import logo from "/images/logo.svg";
import icon from "/images/icon-units.svg";
import dropdown from "/images/icon-dropdown.svg";
import search from "/images/icon-search.svg";
import { useState } from "react";
import { DropDown } from "./BodyElements/Boxes/DropDown";
import { OptionData } from "../mockData/data";

export const TopSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleSelect = (title: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [title]: option }));
  };
  return (
    <div className="flex flex-col  w-full  mb-12">
      <div className="flex items-center justify-between w-full">
        <img src={logo} alt="logo-icon" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center font-DM-Sans gap-1.5 sm:gap-2.5 px-2 py-2.5 sm:px-4 sm:py-3 
            bg-Neutral-700 rounded-md sm:rounded-lg cursor-pointer transition duration-300 focus:outline-none 
             focus:ring-1 focus:ring-Neutral-0 focus:ring-offset-1 "
        >
          <img src={icon} alt="icon-units" />
          Units
          <img src={dropdown} alt="icon-dropDrown" />
          {isOpen && (
            <div
              className="absolute top-full right-0 mt-2 text-start flex flex-col 
            bg-Neutral-800 rounded-xl shadow-lg px-2 py-1.5 w-[214px] z-10 gap-1
            border-inline"
            >
              <p className="font-DM-Sans font-[500] text-[16px] px-2 py-2.5 ">
                Switch to imperial
              </p>
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
      <div className="flex flex-col items-center justify-center  mt-16">
        <h1 className="text-[55px] font-family font-[700] max-w-[300px] md:max-w-md lg:max-w-full break-words ">
          How's the sky looking today?
        </h1>
        <div className="flex items-center justify-center flex-col sm:flex-row mt-16 w-full gap-4">
          <div
            className="flex bg-Neutral-600 p-2 w-full xl:w-[526px] rounded-lg py-4 px-6 gap-4 
               items-center cursor-pointer border-2 border-transparent box-border 
               focus-within:ring-2 focus-within:ring-Neutral-0 focus-within:ring-offset-2 focus-within:ring-offset-Neutral-700 relative"
          >
            <img src={search} alt="search-icon" />
            <input
              type="search"
              placeholder="Search for the place.."
              className=" border-none  bg-transparent font-[500]  text-white focus:outline-none placeholder:text-xl w-full"
            />

            <div className="absolute top-full bg-Neutral-800 rounded-xl flex flex-col left-0 mt-2 p-2 gap-1  w-full border-inline z-20">
              <p className="px-2 py-2.5 flex flex-row border-inline rounded-lg gap-2.5 bg-Neutral-700 font-[500] text-[16px] font-DM-Sans">
                e.g London
              </p>
            </div>
          </div>
          <button
            className="py-4 px-6 w-full sm:w-[120px] bg-Blue-500 rounded-xl cursor-pointer text-xl 
             hover:bg-Blue-700 transition duration-300 focus:outline-none 
             focus:ring-2 focus:ring-Blue-500 focus:ring-offset-2 focus:ring-offset-Blue-700"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
