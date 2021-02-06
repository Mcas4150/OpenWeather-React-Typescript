import React, { useState, useEffect } from "react";
import "./App.css";
import { Card } from "@material-ui/core";
import styled from "styled-components";
import { API_KEY, FORECAST_URL, WEATHER_URL } from "./utils/setAuthToken";
import { format, fromUnixTime } from "date-fns";
import CurrentWeather from "./components/weather";
import Forecast from "./components/forecast";

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
  temp: number;
  description: string;
  day: string;
}

// const initialWeatherState: Weather = {
//   temp: 0,
//   description: "",
//   city: "",
//   day: "",
// };

const App: React.FunctionComponent<AllWeather> = (props) => {
  const [weather, setWeather] = useState<any>("");
  const [forecast, setForecast] = useState<any>("");

  const parseDate = (unixDate: number) => {
    const date = fromUnixTime(unixDate);
    const day = format(date, "EEEE");
    return day;
  };

  const getCurrentWeather = async () => {
    const response = await fetch(
      `${WEATHER_URL}?q=Boston&units=imperial&APPID=${API_KEY}`
    );
    const data = await response.json();
    const temp = data.main.temp;
    const currentWeather: any[] = [];
    const [weather] = data.weather;
    const description = weather.description;
    const day = parseDate(data.dt);
    const city = data.name;
    const icon = weather.icon;
    currentWeather.push([temp, description, day, city, icon]);
    setWeather(currentWeather);
  };

  const getForecast = async () => {
    const response = await fetch(
      `${FORECAST_URL}?q=Boston&units=imperial&APPID=${API_KEY}`
    );
    const data = await response.json();
    if (data.list) {
      const weatherList = data.list;
      const fiveDayForecast: any[] = [];
      for (let i = 1; i < weatherList.length; i += 8) {
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



  return (
    <CardContainer>
      {weather && (
        <WeatherCard>
          <CurrentContainer>
            <CurrentWeather weather={weather} />
          </CurrentContainer>

          <ForecastContainer>
            <Forecast forecast={forecast} />
          </ForecastContainer>
        </WeatherCard>
      )}
    </CardContainer>
  );
};

const Flex = styled.div`
  display: flex;
`;



const CardContainer = styled(Flex)`
  justify-content: center;
  margin: 15px;
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
  padding: 10px;
`;

export default App;
