/* eslint-disable react/prop-types */

import { FaLocationDot } from "react-icons/fa6";

/* eslint-disable no-unused-vars */
const SearchBar = ({ filter, setFilter }) => {
  return (
    <div className="flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-900/5">
      <input
        type="text"
        placeholder="Enter residency name/city/country"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className="bg-transparent border-none outline-none w-full"
      />
      <FaLocationDot className="relative right-4 text-xl hover:text-secondary cursor-pointer" />
    </div>
  );
};

export default SearchBar;
