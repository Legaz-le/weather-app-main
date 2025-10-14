import checkMark from "/images/icon-checkmark.svg";

type DropDownProps = {
  title: string;
  options: string[];
  selectedOption?: string;
  onSelect?: (option: string) => void;
};

export const DropDown = ({ title, options, selectedOption, onSelect }: DropDownProps) => {
  return (
    <div className="flex flex-col ">
      <h4 className="text-sm font-DM-Sans font-[500] text-Neutral-300 px-2 py-1.5">
        {title}
      </h4>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect?.(option)}
          className="flex flex-row items-center justify-between px-2 py-1 w-full 
          text-left bg-[#302F4A] rounded-lg"
        >
          <span className="font-DM-Sans font-[500] text-[16px]">{option}</span>
          <img
            src={checkMark}
            alt="checkMark-icon"
            className={selectedOption === option ? "block" : "hidden"}
          />
        </button>
      ))}
    </div>
  );
};