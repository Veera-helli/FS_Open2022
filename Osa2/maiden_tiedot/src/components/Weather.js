import { useState, useEffect } from "react";
import axios from "axios";

const Weather = (props) => {
  const [icon, setIcon] = useState("01n");
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);

  const lat = props.country.capitalInfo.latlng[0];
  const lng = props.country.capitalInfo.latlng[1];
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`
      )
      .then((response) => {
        setIcon(response.data.weather[0].icon);
        setTemp(response.data.main.temp);
        setWind(response.data.wind.speed);
      });
  }, []);

  return (
    <div>
      <h3>Weather in {props.country.capital}</h3>
      <p>Temperature: {(temp - 273.15).toFixed(2)} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Flag" />
      <p>Wind: {wind.toFixed(2)} m/s</p>
      {/* http://openweathermap.org/img/wn/10d@2x.png */}
    </div>
  );
};

export default Weather;
