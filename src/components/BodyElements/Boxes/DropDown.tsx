import checkMark from "/images/icon-checkmark.svg";

type DropDownProps = {
  title: string;
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
};

export const DropDown = ({
  title,
  options,
  selectedOption,
  onSelect,
}: DropDownProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-DM-Sans font-[500] text-Neutral-300 p-titleOption">
        {title}
      </h4>
      <div className="flex flex-col gap-1">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`flex flex-row items-center justify-between px-2 py-2.5 w-full text-left rounded-md transition-colors 
              ${
                isSelected
                  ? "bg-Neutral-700"
                  : "hover:bg-Neutral-600 cursor-pointer"
              }`}
            >
              <span className="font-Awsom font-[400] text-[14px]">
                {option}
              </span>
              <img
                src={checkMark}
                alt="checkMark-icon"
                className={isSelected ? "block" : "hidden"}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
