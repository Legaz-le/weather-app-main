"use client";

import Image from "next/image";
import { DropDownProps } from "@/types/component";

export const DropDown = ({ title, options, selectedOption }: DropDownProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-DM-Sans text-Neutral-300 p-titleOption text-sm font-[500]">
        {title}
      </h4>
      <div className="flex flex-col gap-1">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <p
              key={option}
              className={`flex w-full flex-row items-center justify-between rounded-md px-2 py-2.5 text-left transition-colors ${
                isSelected ? "bg-Neutral-700" : ""
              }`}
            >
              <span className=" text-[16px] font-[600]">{option}</span>
              <Image
                src="/images/icon-checkmark.svg"
                alt="checkMark-icon"
                className={isSelected ? "block" : "hidden"}
                width={0}
                height={0}
              />
            </p>
          );
        })}
      </div>
    </div>
  );
};
