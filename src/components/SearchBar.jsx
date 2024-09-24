import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  isDarkMode,
  handleInputChange,
  toggleTheme,
  handleSearch,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };
  return (
    <div className="relative mt-10 min-w-[40%] mobile:mx-4">
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className={`${
            isDarkMode
              ? "text-white bg-black bg-opacity-50 hover:bg-purple-300 hover:text-black"
              : "text-black bg-purple-300 hover:bg-black hover:text-white"
          } transition duration-300 rounded-2xl font-bold p-3 mr-4 w-1/5 mobile:p-3 h-full mobile:text-xs py-5`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="relative flex-grow mobile:w-3/5 mobile:text-xs">
          <label
            className={`absolute pl-4 text-sm mobile:text-xs ${
              isDarkMode ? "text-gray-300" : " text-gray-600"
            } top-2`}
          >
            Country / City
          </label>
          <input
            className={`w-full pb-4 pt-7 pl-4 font-bold h-[10%] ${
              isDarkMode
                ? "bg-violet-900 text-white placeholder:text-gray-200"
                : "bg-purple-300 text-black placeholder:text-gray-700"
            } shadow-sm placeholder:italic rounded-2xl mobile:h-full`}
            placeholder="Type something..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            type="text"
            name="search"
          />
        </div>
        <button
          className={`ml-4 text-white w-16 h-16 mobile:w-12 mobile:h-12 ${
            isDarkMode ? "bg-violet-950" : "bg-purple-800"
          } shadow-sm cursor-pointer rounded-2xl mobile:text-sm flex items-center justify-center`}
          type="button"
          onClick={handleSearch}
        >
          <FaSearch className="w-1/2 h-1/2" />{" "}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
