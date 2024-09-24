import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import Content from "./components/Content";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);

  const API_KEY = "a2a4b4ff241c8f9ce08818f5908ae5e7";
  const DEFAULT_CITY_NAME = "Kuala Lumpur";
  const historyRef = useRef(history);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY_NAME}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setWeatherData(data);

        if (data) {
          updateHistory(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    const savedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (savedHistory) {
      setHistory(savedHistory);
    }
  }, [DEFAULT_CITY_NAME, API_KEY]);

  const updateHistory = (data) => {
    const updatedHistory = [...historyRef.current, data];
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (query === "") {
      setError(`Unable to search with empty string`);
    }
    handleSearch(query);
  };

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    if (!searchQuery || searchQuery.trim() === "") return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`[${query}] ${errorData.message}`);
      }

      const data = await response.json();
      setWeatherData(data);

      const updatedHistory = [...history, data];
      setHistory(updatedHistory);
      localStorage.setItem(`searchHistory`, JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (itemIndex) => {
    const updatedHistory = history.filter((_, index) => index !== itemIndex);
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`relative min-h-screen bg-center bg-cover ${
        isDarkMode ? "bg-dark text-white" : "bg-light text-black"
      }`}
    >
      <div className="inset-0 ">
        <div className="flex flex-col items-center justify-center">
          <SearchBar
            isDarkMode={isDarkMode}
            handleSearch={handleSearchClick}
            handleInputChange={handleInputChange}
            toggleTheme={toggleTheme}
          />
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-32 h-auto text-gray-200 animate-spin dark:text-white fill-purple-600 mt-10 mx-2"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : error ? (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 flex flex-col rounded relative mt-5"
              role="alert"
            >
              <strong class="font-bold">{error.message ?? error}</strong>
            </div>
          ) : (
            <Content
              isDarkMode={isDarkMode}
              weatherData={weatherData}
              historyData={history}
              handleSearch={handleSearch}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
