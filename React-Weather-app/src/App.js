import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');

  let [city, setcity] = useState('');
  let [temp, settemp] = useState('');
  let [weather, setweather] = useState('');
  
  const [data,setdata] = useState({});
  const [location,setlocation] = useState('');

  let current_location = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=b85ea86ddeb02c278d2496a70f3918e4`;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b85ea86ddeb02c278d2496a70f3918e4`;

  // Gealocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setlatitude(position.coords.latitude);
      setlongitude(position.coords.longitude);
    });
  }, [latitude,longitude]);
  // End of geolocation

  axios.get(current_location)
    .then((response) =>{
      setcity(response.data.name);
      settemp(response.data.main.temp.toFixed());
      setweather(response.data.weather[0].main);
    })
    .catch((error) => {});

  // Search location
  const searchlocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url)
        .then((response) =>{
          setdata(response.data);
        });
      setlocation('')
    }
  }
  // End of search location

  return (
    <div className='app'>
      <div className="container">
        <div className="search">
          <input type="text" value={location} 
          onChange={event => setlocation(event.target.value)}
          placeholder='Enter Location'
          onKeyPress={searchlocation} />
        </div>
        <div className="top">
          <div className="city">
            {data.name ? <p>{data.name}</p> : <p>{city}</p>}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : <h1>{temp}°F</h1>}
          </div>
          <div className="weather">
            {data.weather ? <p>{data.weather[0].main}</p> : <p>{weather}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;