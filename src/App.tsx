import React, {useState, useEffect} from 'react';
import './App.css';
// import Weather from "./weather";
// import { Service } from "./types/service";
// import openWeather from "./components/openWeather"
// import Forecast from "./components/forecast";
import { format, fromUnixTime } from "date-fns";
// import { Weather } from "./types/weather";


// interface State {
//   temp: {[key: string] : string}
// }

export interface AllWeather {
  // fiveDays: string[];
  // temp: string
}

// const defaultWeather: AllWeather[] = [];


const App: React.FunctionComponent<AllWeather> = props => {
//  const [weatherData, setWeatherData] = useState<Service<AllWeather>>({
//    status: "loading"
//  })
const [weather, setWeather] = useState<string>('');
const [forecast, setForecast] = useState<any>('')



const API_KEY = "903f3bef731426a6225b7cac7ff165ac";

const getCurrentWeather = async () => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=${API_KEY}`);
  const data = await response.json();
  const temp = data.main.temp
  setWeather(temp)
console.log(data)
}

const getForecast = async () => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=${API_KEY}`);
  const data = await response.json();
  if(data.list){
    let weatherList = data.list;
    let fiveDayForecast : any[] = [];
    for (let i = 0; i < weatherList.length; i += 8) {
      let date = fromUnixTime(weatherList[i].dt)
      console.log(weatherList[i].dt)
      let day = format(date, 'EEEEEE');
      //  let date = weatherList[i].dt.format("dddd");
      // let date = "sund"
      let weatherIcon = weatherList[i].weather[0].icon;
      let Temp = Math.floor(weatherList[i].main.temp);

      fiveDayForecast.push([day, weatherIcon, Temp]);
    }
    setForecast(fiveDayForecast)

  }
  // const temp = data
  // setWeather(temp)
console.log(data)
}


useEffect(()=> {
  getCurrentWeather();
  getForecast();
}, []);



const renderFiveDayForecast = () => {
  if (forecast){
  return forecast.map((day: string) => {
    return(
      <div key={day[0]} className="daily">
        <p>{day[0]}</p>
        <img src={`http://openweathermap.org/img/wn/${day[1]}.png`} alt="weatherIcon"/>
        <p id="Temp">{day[2]}<span>&deg;</span><span>C</span></p>
    </div>
    );
  })};
}

  return (
    <div>

{weather && <div>{weather}
<div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignContent:"center"}}>
{renderFiveDayForecast()}
</div>
</div>}
    </div>
  )

}


export default App;
