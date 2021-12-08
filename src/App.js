import './App.css';
import React, { useState } from 'react';

const apiKey = {
  id: "22fc5591daa53d5bc89200c1318ed631",
  targ: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const search = event => {
    if(event.key==="Enter"){
      fetch(`${apiKey.targ}weather?q=${query}&units=metric&APPID=${apiKey.id}`)
      .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const time = new Date();
  const hour = time.getHours();

  const locationDate = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(hour>5 && hour<19)?'App':'AppNight'}>
      <main>
        <div className="searchBox">
          <input type="text"
          className="searchBar"
          placeholder="Location"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (<>
          <div className="weatherData">
          <div className="temp">
            {Math.round(weather.main.temp)}°c
          </div>
          <div className="weather">
            {weather.weather[0].main}
          </div>
        </div>
        <div className="locationData">
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="date">
            {locationDate(new Date())}
          </div>
        </div>
        </>) : (
          weather.cod === "404"
        )?(
          <>
          <div className="error">
            City not found
          </div>
        </>
        ):(
          <>
          <div className="empty">
            Search for the Place
          </div>
        </>
        )}
      </main>
    </div>
  );
}

export default App;
