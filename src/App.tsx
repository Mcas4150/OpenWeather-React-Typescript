import React, { useState, useEffect } from "react";
import "./App.css";
import { Card } from "@material-ui/core";
import styled from "styled-components";
import { API_KEY, FORECAST_URL, WEATHER_URL } from "./utils/setAuthToken";
import { format, fromUnixTime } from "date-fns";

// interface State {
//   temp: { [key: string]: string };
// }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AllWeather {}

interface Weather {
  temp: number;
  description: string;
  city: string;
  day: string;
}

interface Forecast {
  temp: number
  description: string,
  day: string,
}

// const initialWeatherState: Weather = {
//   temp: 0,
//   description: "",
//   city: "",
//   day: "",
// };

const App: React.FunctionComponent<AllWeather> = (props) => {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [forecast, setForecast] = useState<any>("");

  const parseDate = (unixDate: number) => {
    const date = fromUnixTime(unixDate);
    const day = format(date, "EEEE");
    return day;
  };

  const getCurrentWeather = async () => {
    const response = await fetch(
      `${WEATHER_URL}?q=London&units=metric&APPID=${API_KEY}`
    );
    const data = await response.json();
    // const temp = data.main.temp;
    // let currentWeather: any[] = [];
    // const [weather] = data.weather;
    // const description = weather.description;
    // const day = parseDate(data.dt);
    // const city = data.name;
    // console.log(description);
    // const icon = weather.icon;
    // currentWeather.push([temp, description, day, city]);
    // setWeather({ ...weather, currentWeather });
    setWeather(data);
  };

  const getForecast = async () => {
    const response = await fetch(
      `${FORECAST_URL}?q=London&units=metric&APPID=${API_KEY}`
    );
    const data = await response.json();
    if (data.list) {
      const weatherList = data.list;
      const fiveDayForecast: any[] = [];
      for (let i = 0; i < weatherList.length; i += 8) {
        const date = fromUnixTime(weatherList[i].dt);
        const day = format(date, "EEEEEE");
        const weatherIcon = weatherList[i].weather[0].icon;
        const Temp = Math.floor(weatherList[i].main.temp);

        fiveDayForecast.push([day, weatherIcon, Temp]);
      }
      setForecast(fiveDayForecast);
    }
  };

  useEffect(() => {
    getCurrentWeather();
    getForecast();
  }, []);

  const renderWeather = () => {
    if (weather) {
    const temp = weather.main.temp;
    // let currentWeather: any[] = [];
    const [weatherData] = data.weather;
    const description = weatherData.description;
    const day = parseDate(data.dt);
    const city = data.name;
    console.log(description);
    // const icon = weather.icon;
    // currentWeather.push([temp, description, day, city]);
    setWeather({ ...weather, currentWeather });
      return <div>weather</div>;
    }
  };

  const renderFiveDayForecast = () => {
    if (forecast) {
      return forecast.map((day: string) => {
        return (
          <Day key={day[0]}>
            <p>{day[0]}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day[1]}.png`}
              alt="weatherIcon"
            />
            <p id="Temp">
              {day[2]}
              <span>&deg;</span>
              <span>C</span>
            </p>
          </Day>
        );
      });
    }
  };

  return (
    <WeatherContainer>
      {weather && (
        <WeatherCard>
          <CurrentContainer>{renderWeather()}</CurrentContainer>

          <ForecastContainer>{renderFiveDayForecast()}</ForecastContainer>
        </WeatherCard>
      )}
    </WeatherContainer>
  );
};

const Flex = styled.div`
  display: flex;
`;

const WeatherContainer = styled(Flex)`
  justify-content: center;
`;

const Day = styled(Flex)`
  align-items: center;
  flex-direction: column;
`;

const CurrentContainer = styled(Flex)`
  justify-content: center;
`;

const ForecastContainer = styled(Flex)`
  flex-direction: row;
`;

const WeatherCard = styled(Card)`
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-content: center;
  padding: 5px;
`;

export default App;
