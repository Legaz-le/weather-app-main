import logo from "../public/images/logo.svg";
import icon from "../public/images/icon-units.svg";
import dropdown from "../public/images/icon-dropdown.svg";

export const TopSide = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <img src={logo} alt="logo-icon" />
        <button className="flex">
          <img src={icon} alt="icon-units" />
          Units
          <img src={dropdown} alt="icon-dropdrown" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center mt-15">
        <h1 className="text-5xl">How's the sky looking today?</h1>
        <div className="flex items-center justify-between mt-10">
          <input
            type="search"
            placeholder="Search for the place.."
            className="bg-Neutral-300 p-2 "
          />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};
