import React, { useState, useEffect } from 'react';

const SearchWeather = () => {
  const [data, setData] = useState();
  const [city, setCity] = useState('noida');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (city) {
        fetchWeather();
      } else {
        setData(null);
      }
    }, 500); // Debounce delay of 500 milliseconds

    return () => clearTimeout(delayDebounceFn);
  }, [city]);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15684bbe0cbae8b66b0c703e7d2cc092`
      );
      const result = await response.json();
      if (result.name.toLowerCase() === city.toLowerCase()) {
        setData(result);
      } else {
        setData(null); // Invalid result, clear the data
      }
    } catch (error) {
      console.error('Error fetching weather data: ', error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  let emoji = null;
  if (data && data.weather && data.weather.length > 0) {
    const weatherMain = data.weather[0].main;
    if (weatherMain === 'Clouds') {
      emoji = 'fa-cloud';
    } else if (weatherMain === 'Thunderstorm') {
      emoji = 'fa-bolt';
    } else if (weatherMain === 'Drizzle') {
      emoji = 'fa-cloud-rain';
    } else if (weatherMain === 'Rain') {
      emoji = 'fa-cloud-shower-heavy';
    } else if (weatherMain === 'Snow') {
      emoji = 'fa-snowflake';
    } else {
      emoji = 'fa-smog';
    }
  }
  let d = new Date()
  let date = d.getDate()
  let month = d.toLocaleDateString("default", { month: "long" })
  let year = d.getFullYear()
  let day = d.toLocaleString("default", { weekday: "long" })

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })

  return (
    <div className='container mt-2'>
      <div className='row justify-content-center'>
        <div className='col-md-4'>
          <div className='card text-white text-center'>
            <img
              src="http://source.unsplash.com/550x1050/?weather,rain,cloud,sunrises"
              className='card-img img-fluid'
              alt=''
            />


            <div className='card-img-overlay'>
              <div className='input-group mb-1 w-75 mx-auto'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter City Name'
                  value={city}
                  onChange={handleCityChange}
                />
              </div>
              {data ? (
                <div className='bg-dark bg-opacity-25  py-2'>
                  <h2 className='card-title' style={{ color: "blue" }}>{data.name}</h2>
                  <p className='card-text lead'>{day}, {date} {month}, {year}</p>
                  <p className='card-text lead'>{time}</p>

                  {
                    data.sys && data.sys.country ? (
                      <h3 className='card-text' style={{ color: "blue" }}>
                        <span style={{ color: "white" }}>Country -: </span> {data.sys.country}
                      </h3>
                    ) : null
                  }

                  <hr />
                  <i className={`fas ${emoji} fa-3x`} id='cloud'></i>

                  {data.main && (
                    <>
                      <h1 className='fs-2 mb-2'>
                        {(data.main.temp - 273).toFixed(2)}°C
                      </h1>
                      <p className='lead fw-bolder mb-0'>{data.weather[0].main}</p>
                      <p className='lead fs-4'>
                        {(data.main.temp_min - 273.15).toFixed(2)}°C |{' '}
                        {(data.main.temp_max - 273.15).toFixed(2)}°C
                      </p>
                      <p className='fw-bolder'>Pressure -: {data.main.pressure}</p>
                      <p className='fw-bolder'>Wind -: {data.wind.speed} Km/h </p>
                      <p className='fw-bolder'>Visibility -: {(data.visibility / 1000)} Km </p>

                    </>
                  )}
                </div>
              ) : (
                <div>Loading...</div>
              )}
              <p className='last'>Rameshvar Gupta copyright @ July 2023</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SearchWeather;
