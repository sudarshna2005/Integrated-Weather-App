import React, { useState } from 'react';
import './WeatherApp.css';  // Import the CSS file

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [cropData, setCropData] = useState(null);

  const handleWeatherSubmit = async () => {
    if (!city) return;

    const apiKey = '89e3a25d24e50797f176a8945973ce5e'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert('Error fetching weather data.');
    }
  };

  const handleCropCareSubmit = async () => {
    const cropInput = document.getElementById('cropInput').value.trim().toLowerCase();
    const cityInput = document.getElementById('cropCityInput').value.trim();

    if (!cropInput || !cityInput) return;

    const apiKey = '89e3a25d24e50797f176a8945973ce5e';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const cropCareData = {
        apple: {
          rainy: 'Prune to improve air circulation, reducing fungal risks.',
          highTemp: 'Ensure sufficient water supply; consider mulching.',
          coldWeather: 'Protect young trees from frost using a burlap wrap.',
          normal: 'Regular pruning and balanced watering as needed.'
        },
        potato: {
          rainy: 'Hill soil around plants to avoid exposure and potential rot.',
          highTemp: 'Water regularly but avoid over-watering.',
          coldWeather: 'Harvest before the first hard frost to avoid damage.',
          normal: 'Water moderately and keep soil well-drained.'
        },
        grapes: {
          rainy: 'Prune vines to enhance airflow, reducing mildew risks.',
          highTemp: 'Ensure consistent irrigation.',
          coldWeather: 'Mulch to insulate roots and prevent frost damage.',
          normal: 'Regular watering and pruning for vine health.'
        },
        banana: {
          rainy: 'Clear excess water from the base to prevent root rot.',
          highTemp: 'Increase watering frequency.',
          coldWeather: 'Protect young plants in cold climates with a frost cloth.',
          normal: 'Frequent watering and soil aeration.'
        },
        onion: {
          rainy: 'Avoid waterlogging by ensuring good soil drainage.',
          highTemp: 'Water deeply but infrequently.',
          coldWeather: 'Cover with mulch or straw to protect from frost.',
          normal: 'Regular watering and soil moisture monitoring.'
        },
        carrot: {
          rainy: 'Thin plants to allow airflow, reducing fungal risks.',
          highTemp: 'Keep soil consistently moist.',
          coldWeather: 'Apply mulch to extend the growing season.',
          normal: 'Moderate watering and pest checks.'
        },
        mango: {
          rainy: 'Prune to prevent fungal issues; monitor for powdery mildew.',
          highTemp: 'Water young trees regularly; mature trees are drought-resistant.',
          coldWeather: 'Young trees may need protection in frost-prone areas.',
          normal: 'Moderate watering with periodic pruning.'
        },
        wheat: {
          rainy: 'Ensure field has good drainage; avoid waterlogging.',
          highTemp: 'Provide regular irrigation during early growth.',
          coldWeather: 'Winter varieties can handle frost; avoid late planting.',
          normal: 'Irrigate moderately; control weeds for optimal growth.'
        },
        mustard: {
          rainy: 'Avoid waterlogging; mustard plants prefer less humidity during growth.',
          highTemp: 'Water regularly in high temperatures, especially young plants.',
          coldWeather: 'Tolerant to cold; ideal as a winter crop in northern regions.',
          normal: 'Moderate watering and regular weeding for optimal growth.'
        },
        
        rice: {
          rainy: 'Ensure field drainage if there is excess rain to prevent waterlogging.',
          highTemp: 'Maintain consistent water levels for healthy growth.',
          coldWeather: 'Not ideal for rice; select suitable planting times to avoid frost.',
          normal: 'Regular irrigation management.'
        },
        cucumber: {
          rainy: 'Train vines vertically to improve airflow; prevent waterlogging.',
          highTemp: 'Water consistently and apply mulch to retain moisture.',
          coldWeather: 'Use row covers or plant in warmer seasons.',
          normal: 'Water moderately; fertilize regularly for better yields.'
        },
        corn: {
          rainy: 'Monitor for pests; ensure adequate drainage to prevent waterlogging.',
          highTemp: 'Water consistently, especially during pollination.',
          coldWeather: 'Not ideal for corn; avoid planting in cold conditions.',
          normal: 'Regular watering; fertilize every few weeks for optimal growth.'
        },
        tomato: {
          rainy: 'Avoid waterlogging; prune leaves to improve airflow.',
          highTemp: 'Water consistently; mulch to retain moisture.',
          coldWeather: 'Protect with row covers.',
          normal: 'Water moderately and apply balanced fertilizer every 2 weeks.'
        },
        chili: {
          rainy: 'Prune for airflow; avoid waterlogging.',
          highTemp: 'Regular watering; mulch to retain moisture.',
          coldWeather: 'Protect from frost.',
          normal: 'Moderate watering and monthly fertilization.'
        }
      };

      // Get weather conditions
      const weatherDesc = data.weather[0].description.toLowerCase();
      const temp = data.main.temp;

      // Determine appropriate care based on conditions
      let cropCareGuide = 'No crop care guide available.';
      const selectedCrop = cropCareData[cropInput];

      if (selectedCrop) {
        if (weatherDesc.includes('rain')) {
          cropCareGuide = selectedCrop.rainy;
        } else if (temp > 25) {
          cropCareGuide = selectedCrop.highTemp;
        } else if (temp < 10) {
          cropCareGuide = selectedCrop.coldWeather;
        } else {
          cropCareGuide = selectedCrop.normal;
        }
      }

      setCropData(cropCareGuide);
    } catch (error) {
      alert('Error fetching weather data for crop care.');
    }
  };

  return (
    <div className="container">
      {/* Weather App Section */}
      <div className="box weather-app">
        <h2>Weather App</h2>
        <input
          type="text"
          id="cityInput"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleWeatherSubmit}>Get Weather</button>

        {weatherData && (
          <div className="result-box" id="weatherResult">
            <p>{`Weather in ${weatherData.name}: ${weatherData.main.temp}°C, ${weatherData.weather[0].description}`}</p>
            <p>{weatherData.weather[0].main === 'Rain' ? 'Reminder: Carry an umbrella!' : ''}</p>
          </div>
        )}
      </div>

      {/* Crop Care Section */}
      <div className="box crop-care">
        <h2>Crop Care Guidance</h2>
        <input type="text" id="cropInput" placeholder="Enter crop name" />
        <input type="text" id="cropCityInput" placeholder="Enter city name" />
        <button onClick={handleCropCareSubmit}>Get Crop Care Guide</button>

        {cropData && (
          <div className="result-box" id="cropResult">
            <p>{cropData}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
