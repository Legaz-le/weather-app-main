import logo from "/images/logo.svg";
import icon from "/images/icon-units.svg";
import dropdown from "/images/icon-dropdown.svg";
import search from "/images/icon-search.svg";

export const TopSide = () => {
  return (
    <div className="flex flex-col w-full  mb-12">
      <div className="flex items-center justify-between">
        <img src={logo} alt="logo-icon" />
        <button className="flex items-center gap-2.5 px-4 py-3 bg-Neutral-600 rounded-lg cursor-pointer">
          <img src={icon} alt="icon-units" />
          Units
          <img src={dropdown} alt="icon-dropDrown" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center  mt-16">
        <h1 className="text-[52px] font-family font-[700]">How's the sky looking today?</h1> 
        <div className="flex items-center justify-center mt-16  gap-4">
          <div className="flex bg-Neutral-600 p-2 w-[526px] rounded-lg py-4 px-6  gap-4 items-center">
            <img src={search} alt="search-icon" />
            <input
              type="search"
              placeholder="Search for the place.."
              className=" border-none  bg-transparent font-[500]  text-white focus:outline-none placeholder:text-xl"
            />
          </div>
          <button className="py-4 px-6 bg-Blue-500 rounded-xl cursor-pointer text-xl">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
