import logo from "../public/images/logo.svg";
import icon from "../public/images/icon-units.svg";
import dropdown from "../public/images/icon-dropdown.svg";
import search from "../public/images/icon-search.svg";

export const TopSide = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <img src={logo} alt="logo-icon" />
        <button className="flex gap-2 px-4 py-2 bg-Neutral-600 rounded-lg cursor-pointer">
          <img src={icon} alt="icon-units" />
          Units
          <img src={dropdown} alt="icon-dropdrown" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center mt-15">
        <h1 className="text-5xl">How's the sky looking today?</h1>
        <div className="flex items-center justify-between mt-10 gap-2">
          <div className="flex bg-Neutral-600 p-2 rounded-lg px-5 max-w-md gap-2 items-center">
            <img src={search} alt="search-icon" />
            <input
              type="search"
              placeholder="Search for the place.."
              className=" w-md border-none bg-transparent text-white focus:outline-none "
            />
          </div>
          <button className="px-4 py-2 bg-Neutral-600 rounded-lg cursor-pointer">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
