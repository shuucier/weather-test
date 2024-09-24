import React, { useEffect, useState } from "react";
import HistoryItems from "./HistoryItems";

const Content = ({
  isDarkMode,
  weatherData,
  historyData,
  handleSearch,
  handleDelete,
}) => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const isRain = weatherData.weather[0].main === "Rain" ? true : false;
  const currentDateTime = new Date();
  return (
    <div
      className={`relative flex flex-col mt-32 ${
        isDarkMode
          ? "bg-violet-900"
          : "bg-purple-300 border border-white border-opacity-50"
      }  min-w-[40%] rounded-2xl mb-10 mobile:max-w-[390px]`}
    >
      {isRain ? (
        <img
          src="./images/cloud.png"
          className="absolute top-0 right-0 w-1/2 h-auto transform -translate-y-1/3"
          alt="Weather Icon"
        />
      ) : (
        <img
          src="./images/sun.png"
          className="absolute top-0 right-0 w-1/2 h-auto transform -translate-y-1/3"
          alt="Weather Icon"
        />
      )}
      <div
        className={`flex flex-col mx-12 mt-14 mobile:mx-6 mobile:mt-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        <div className="flex flex-col justify-start mb-2 font-semibold">
          <span className="text-lg mobile:text-base">Today's Weather</span>
          <span
            className={`${
              isDarkMode ? "text-white" : "text-purple-800"
            } text-8xl mobile:text-6xl`}
          >
            {weatherData.main.temp}°
          </span>
          <span className="text-lg mobile:text-base">
            H: {weatherData.main.temp_max}° L:{weatherData.main.temp_min}°
          </span>
        </div>

        <div
          className={`flex flex-row items-center justify-between font-semibold gap-10 ${
            isDarkMode ? "text-white" : "text-gray-500"
          }`}
        >
          <span
            className={`font-bold ${
              isDarkMode ? "text-white" : "text-gray-600"
            } mobile:text-sm`}
          >
            {weatherData.name}, {weatherData.sys.country}
          </span>
          {screenSize.width > 650 && (
            <>
              <span>{currentDateTime.toLocaleString()}</span>
              <span>Humidity: {weatherData.main.humidity}%</span>
              <span>{weatherData.weather[0].main}</span>
            </>
          )}
        </div>
        {screenSize.width <= 650 && (
          <div
            className={`absolute right-6 flex flex-col top-[92px] text-sm text-right ${
              isDarkMode ? "text-white" : "text-gray-500"
            }`}
          >
            <span>{weatherData.weather[0].main}</span>
            <span>Humidity: {weatherData.main.humidity}%</span>
            <span>{currentDateTime.toLocaleString()}</span>
          </div>
        )}
      </div>
      <section
        className={`flex flex-col justify-center px-1 pb-10 mx-12 mt-4 mb-10 space-y-3 mobile:mx-6 ${
          isDarkMode
            ? "text-white bg-violet-950 bg-opacity-50"
            : "text-black bg-purple-200"
        } rounded-2xl`}
      >
        <span className="pt-4 pl-5 text-xl text-left mobile:text-base">
          Search History
        </span>
        {historyData.length > 0 ? (
          historyData.map((data, index) => (
            <HistoryItems
              key={index}
              isDarkMode={isDarkMode}
              data={data}
              handleSearch={() => handleSearch(data.name)}
              handleDelete={() => handleDelete(index)}
              screenSize={screenSize}
            />
          ))
        ) : (
          <span className="pl-5">No record found</span>
        )}
      </section>
    </div>
  );
};

export default Content;
