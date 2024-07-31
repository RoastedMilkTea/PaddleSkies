import './App.css';
import React, { useState } from 'react';
import Forecast from './components/forecast/forecast';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import SignupForm from './components/signupform/signupform'; 
import { WEATHER_API_URL, WEATHER_API_KEY } from './cityapi';
import logo from './otherasset/dblogo.png';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [user, setUser] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.error(err));
  };

  const handleSignup = (user) => {
    setUser(user);
  };

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="App Logo" className="logo" />
        <div className="search-bar">
          <Search onSearchChange={handleOnSearchChange} />
        </div>
        {user && <div className="user-info">Welcome, {user.name}</div>}
      </div>
      {!user && <SignupForm onSignup={handleSignup} />}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;



