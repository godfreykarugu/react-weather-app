import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const search = async (city) => {
    if (!city) return;

    const apikey = 'cfc0a526b907226e6c06731f9820698f';

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
      );

      if (!response.ok) {
        alert('City not found');
        return;
      }

      const data = await response.json();
      setWeather(data); // Set the fetched data into the `weather` state
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(city); // Trigger the search with the city name
  };

  useEffect(()=>{
    search('London')
  },[])

  return (
    <div>
      <div className="weather-container">
        <form onSubmit={handleSubmit} className="weather-input">
          <input
            type="text"
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {weather ? (
          <>
            <div className="city-details">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather-icon"
              />
              <h2>{Math.round(weather.main.temp - 273.15)}°C</h2>
              <h3>{weather.name}</h3>
            </div>
            <div className="weather-details">
              <div className="weather-input">
                <img src="" alt="" />
                <p>
                  {weather.wind.speed} km/h <br /> <span>wind speed</span>
                </p>
              </div>
              <div className="weather-input">
                <img src="" alt="" />
                <p>
                  {weather.main.humidity}% <br /> <span>humidity</span>
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
