import React, {useEffect, useState, useRef} from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon.png'
import cloudy from '../assets/cloudy.png'
import half_rainy from '../assets/half-rainy.png'
import rainy_day from '../assets/rainy-day.png'
import storm from '../assets/storm.png'
import snow from '../assets/snow.png'
import sunny from '../assets/sunny.png'
import humidity from '../assets/humidity.png'
import wind_speed from '../assets/wind-speed.png'



const Weather = () => {

  const inputRef = useRef;
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    location: '',
    icon: ''

  });

  const [city, setCity] = useState('London');

  const allIcons = {
    "02d": cloudy,
    "02n": cloudy,
    "03d": half_rainy,
    "03n": half_rainy,
    "04d": rainy_day,
    "04n": rainy_day,
    "05d": storm,
    "05n": storm,
    "06d": snow,
    "06n": snow,
    "07d": sunny,
    "07n": sunny,

  }
  const search = async() => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4df07669c584a48743d0958667b0de1e=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] 
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon: icon
      })
    }
    catch (error) {

    }
  }

  useEffect(() => {
    search(city)
  }, [city])
  return (
    <div className = 'weather'>
        <div className='search-bar'>
            <input ref = {inputRef}type='text' placeholder='Search' />
            <img class = 'search_icon' src={search_icon} alt='' onClick={() => search(inputRef.current.value)}/>
        </div>
        
        <img className = 'weather_icon' src={weatherData.icon} alt=''/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='place'>{weatherData.location}</p>

        <div className='weather_data'>
          <div className='col'>
            <img className='h_w_u' src={humidity} alt='' />
            <span>Humidity</span>
            <p>{weatherData.humidity}</p>
          </div>

          <div className='col'>
          <img className='h_w_u' src={wind_speed} alt='' />
          <span>Wind Speed</span>
            <p>{weatherData.windSpeed} km/hr</p>
          </div>
        </div>
    </div>
  )
}

export default Weather