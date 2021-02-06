import React, { useState, useEffect } from "react";
import "./App.css";
import { Card } from "@material-ui/core";
import styled from "styled-components";
import { API_KEY, FORECAST_URL, WEATHER_URL } from "./utils/setAuthToken";
import { format, fromUnixTime } from "date-fns";
import CurrentWeather from "./components/weather";
import { WeatherContextProvider } from "./context/weatherContext";
import Forecast from "./components/forecast";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AllWeather {}

const App: React.FunctionComponent<AllWeather> = () => {
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
    const description = weather.main;
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
        const icon = weatherList[i].weather[0].icon;
        const description = weatherList[i].weather[0].main;
        const tempMin = Math.floor(weatherList[i].main.temp_min);
        const tempMax = Math.floor(weatherList[i].main.temp_max);

        fiveDayForecast.push([day, icon, description, tempMin, tempMax]);
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
      <WeatherCard>
        <CurrentContainer>
          <WeatherContextProvider>
            <CurrentWeather weather={weather} />
          </WeatherContextProvider>
        </CurrentContainer>

        <ForecastContainer>
          <Forecast forecast={forecast} />
        </ForecastContainer>
      </WeatherCard>
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
