import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const url = `http://api.weatherstack.com/current?access_key=69a62b32158c749c8b3edfaec5045f89&query=${location}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
        </div>
      </div>

      {data?.current?.temperature !== undefined && <>
        <div className='widget'>
          <div className='weatherIcon'>
            <i className="wi wi-day-sunny"></i>
          </div>

          <div className='weatherInfo'>
            <div className='temprature'>
              <span>{data?.current?.temperature}&deg;C</span>
            </div>
            <div className='description'>
              <div className='weatherCond'>{data?.current?.weather_descriptions[0]}</div>
              <div className='place'>{data?.location?.name} , {data?.location?.country}</div>
            </div>
          </div>

          <div className='date'>{new Date().toDateString()}</div>

          <div className='extra-temp'>
            <div className='temp-info-minmax'>
              <div className='two-sided-section'>
                <p><i className={'wi wi-humidity'}></i></p>
                <p className='extra-info-leftside'> {data?.current?.humidity} % <br /> Humidity </p>
              </div>

              <div className='two-sided-section'>
                <p><i className={'wi wi-rain'}></i></p>
                <p className='extra-info-leftside'> {data?.current?.pressure} <br /> Pressure </p>
              </div>

              <div className='two-sided-section'>
                <p><i className={'wi wi-strong-wind'}></i></p>
                <p className='extra-info-leftside'> {data?.current?.wind_speed}<br /> Speed </p>
              </div>
            </div>

          </div>
        </div>
      </>}

    </>
  )
}

export default App;
