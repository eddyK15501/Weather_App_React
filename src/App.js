import React, { useState } from "react";

const App = () => {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");

  const fetchWeather = async (e) => {
    if (e.key === "Enter") {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}?q=${query}&appid=${process.env.REACT_APP_APIKEY}&units=imperial`
      );
  
      const data = await response.json();
  
      setWeather(data);
      console.log(data);
    }
  };

  const dateBuilder = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const day = days[new Date().getDay()];
    const date = new Date().getDate();
    const month = months[new Date().getMonth()];
    const year = new Date().getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={typeof weather.weather == 'undefined' ? "app" : (weather.main.temp >= 70 ? "app warm" : "app")}>
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={fetchWeather}
            placeholder="Search a city for the current weather"
          />
        </div>
        {typeof weather.main == "undefined" ? (
          ""
        ) : (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°F</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
