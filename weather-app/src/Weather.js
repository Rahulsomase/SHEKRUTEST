// Author - Rahul Somase
import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'ffa97c4c904a3ed7d752773122e49b9d'; // Replace with your API Key

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = async (e) => {
    e.preventDefault();

    if (!city) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeatherData(response.data);
    } catch (err) {
      setError("City not found or network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={fetchWeatherData}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>

          
        </div>
      )}
    </div>
  );
};

export default Weather;
