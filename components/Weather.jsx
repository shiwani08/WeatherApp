import React, {useEffect, useState, useRef} from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon.png'
import humidity from '../assets/humidity.png'
import wind_speed from '../assets/wind-speed.png'

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    location: '',
    icon: ''

  });

  // input search function is not working and needs some changes.. also see useEffect Function
  const [city, setCity] = useState('Kolkata');

  // changes need to done in the icon part
  const allIcons = {
    "01d": `https://openweathermap.org/img/wn/01d@2x.png`,
    "02d": `https://openweathermap.org/img/wn/02d@2x.png`,
    "03d": `https://openweathermap.org/img/wn/03d@2x.png`,
    "04d": `https://openweathermap.org/img/wn/04d@2x.png`,
    "09d": `https://openweathermap.org/img/wn/09d@2x.png`,
    "10d": `https://openweathermap.org/img/wn/10d@2x.png`,
    "11d": `https://openweathermap.org/img/wn/11d@2x.png`,
    "13d": `https://openweathermap.org/img/wn/13d@2x.png`,
    "50d": `https://openweathermap.org/img/wn/50d@2x.png`
  }
  const search = async() => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f0f6b7a3baaf5b8f4f334ef25dcb5ebe`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon];
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        icon: icon
      })
    }
    catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search(city);
  }, [city]);

  const handleSearch = () => {
    const newCity = inputRef.current.value.trim();
    if (newCity) {
      setCity(newCity);
    }
  };
  
  return (
    <div className = 'weather'>
        <div className='search-bar'>
            <input ref = {inputRef} type='text' placeholder='Search' />
            <img class = 'search_icon' src={search_icon} alt='' onClick={handleSearch}/>
        </div>
        
        <img className = 'weather_icon' src={weatherData.icon} alt=''/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='place'>{weatherData.location}</p>

        <div className='weather_data'>
          <div className='col'>
            <img className='h_w_u' src={humidity} alt='' />
            <span>Humidity</span>
            <p>{weatherData.humidity}%</p>
          </div>

          <div className='col'>
          <img className='h_w_u' src={wind_speed} alt='' />
          <span>Wind Speed</span>
            <p>{weatherData.windSpeed} km/hr</p>
          </div>
        </div>
    </div>
  );
};

export default Weather;
