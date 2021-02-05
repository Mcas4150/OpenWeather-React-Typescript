import React, {useState, useEffect} from 'react';
import './App.css';
import { Card } from "@material-ui/core";
import styled from "styled-components";
import { API_KEY, FORECAST_URL, WEATHER_URL } from "./utils/setAuthToken";
import { format, fromUnixTime } from "date-fns";

// import { Service } from "./types/service";
// import openWeather from "./components/openWeather"

// interface State {
//   temp: {[key: string] : string}
// }
export interface AllWeather {
  // fiveDays: string[];
  // temp: string
}

const App: React.FunctionComponent<AllWeather> = props => {
const [weather, setWeather] = useState<any>('');
const [forecast, setForecast] = useState<any>('')
//  const [weatherData, setWeatherData] = useState<Service<AllWeather>>({
//    status: "loading"
//  })

const parseDate = (unixDate: number) =>{
  let date = fromUnixTime(unixDate);
  let day = format(date, 'EEEE');
  return day
}

const getCurrentWeather = async () => {
  const response = await fetch(`${WEATHER_URL}?q=London&units=metric&APPID=${API_KEY}`);
  const data = await response.json();
  const temp = data.main.temp
  const [weather] = data.weather;
  const description = weather.description;
  let day = parseDate(data.dt)
  console.log(description)
  const icon = weather.icon
  setWeather([temp, description, icon, day])

}

const getForecast = async () => {
  const response = await fetch(`${FORECAST_URL}?q=London&units=metric&APPID=${API_KEY}`);
  const data = await response.json();
  if(data.list){
    let weatherList = data.list;
    let fiveDayForecast : any[] = [];
    for (let i = 0; i < weatherList.length; i += 8) {
      let date = fromUnixTime(weatherList[i].dt);
      let day = format(date, 'EEEEEE');
      let weatherIcon = weatherList[i].weather[0].icon;
      let Temp = Math.floor(weatherList[i].main.temp);

      fiveDayForecast.push([day, weatherIcon, Temp]);
    }
    setForecast(fiveDayForecast)
  }
}


useEffect(()=> {
  getCurrentWeather();
  getForecast();
}, []);


const renderFiveDayForecast = () => {
  if (forecast){
  return forecast.map((day: string) => {
    return(
      <Day key={day[0]}>
        <p>{day[0]}</p>
        <img src={`http://openweathermap.org/img/wn/${day[1]}.png`} alt="weatherIcon"/>
        <p id="Temp">{day[2]}<span>&deg;</span><span>C</span></p>
    </Day>
    );
  })};
}

  return (
    <WeatherContainer>

{weather &&
<WeatherCard>
  <CurrentContainer>{weather}
  </CurrentContainer>
 <ForecastContainer>
  {renderFiveDayForecast()}
</ForecastContainer>

</WeatherCard>
}
    </WeatherContainer>
  )

}

const Flex = styled.div`
  display: flex
`;

const WeatherContainer = styled(Flex)`
  justify-content: center
`;

const Day = styled(Flex)`
 align-items: center;
 flex-direction: column
`;

const CurrentContainer = styled(Flex)`
 justify-content: center;
`;

const ForecastContainer = styled(Flex)`flex-direction: row`;

const WeatherCard = styled(Card)`
display: flex;
// justify-content: center;
flex-direction: column;
align-content: center;
`;

export default App;
