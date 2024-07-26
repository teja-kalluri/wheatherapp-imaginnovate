import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      return;
    }

    setLoading(true);
    const apiKey = "15ca787f2d191cf1f09525804a2ce85d";
    //const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}`;

    try {
      const response = await axios.get(url);
      console.log(response, "response");
      setForecast(response.data.list.slice(0, 5)); // Get the forecast for the next 5 days
    } catch (error) {
      console.error("Error fetching the weather data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1 className="heading">Weather in Your City</h1>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="city-input"
        />
        <button onClick={fetchWeather} className="search-button">
          <i className="fas fa-search"></i> Search
        </button>
        {loading && <div className="loader"></div>}
      </div>
      {forecast.length > 0 && (
        <div className="forecast-container">
          {forecast.map((day, index) => (
            <table key={index} className="forecast-table">
              <thead>
                <tr>
                  <th colSpan="2" className="headone">
                    {new Date(day.dt_txt).toLocaleDateString()}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="2">Temperature</td>
                </tr>
                <tr>
                  <td>Min</td>
                  <td>Max</td>
                </tr>
                <tr>
                  <td>{day.main.temp_min} °C</td>
                  <td>{day.main.temp_max} °C</td>
                </tr>
                <tr>
                  <td>Pressure</td>
                  <td>{day.main.pressure} hPa</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{day.main.humidity} hu</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
