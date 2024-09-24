import React from "react";
import { FaSearch, FaTrash } from "react-icons/fa";

const HistoryItems = ({
  isDarkMode,
  data,
  handleSearch,
  handleDelete,
  screenSize,
}) => {
  return (
    <div
      className={`flex items-center justify-between px-5 py-2 m-5 mobile:px-3 gap-5 ${
        isDarkMode ? "bg-black bg-opacity-50" : "bg-purple-100"
      } rounded-2xl`}
    >
      <span className="text-left mobile:text-sm mobile:max-w-1/3">
        {data.name}, {data.sys.country}{" "}
        {screenSize.width <= 650 && (
          <span className="text-xs">{new Date().toLocaleString()}</span>
        )}
      </span>
      <div className="flex flex-row items-center gap-3 text-right mobile:gap-2">
        {screenSize.width > 650 && <span>{new Date().toLocaleString()}</span>}
        <button
          className={`block p-2.5 ${
            isDarkMode
              ? "border-gray-500 border-2 text-gray-500"
              : "border-2 border-white bg-white"
          }  shadow-sm cursor-pointer rounded-full`}
          type="button"
          onClick={handleSearch}
        >
          <FaSearch className="h-auto mobile:w-3" />
        </button>
        <button
          className={`block p-2.5 ${
            isDarkMode
              ? "border-gray-500 border-2 text-gray-500"
              : "border-2 border-white bg-white"
          }  shadow-sm cursor-pointer rounded-full`}
          type="button"
          onClick={handleDelete}
        >
          <FaTrash className="h-auto mobile:w-3" />
        </button>
      </div>
    </div>
  );
};

export default HistoryItems;
