import styled from "styled-components";
import { useState, useEffect } from "react";
import { API_KEY, WEATHER_URL } from "../utils/setAuthToken";
import { format, fromUnixTime } from "date-fns";

const CurrentWeather = (props: any) => {
  const [weather, setWeather] = useState<Weather | null>({
    day: "",
    temp: 0,
    city: "",
    icon: "",
    description: "",
  });

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
    const [weather] = data.weather;

    setWeather({
      temp: data.main.temp,
      day: parseDate(data.dt),
      city: data.name,
      icon: weather.icon,
      description: weather.main,
    });
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);

  if (weather) {
    return (
      <WeatherInfo>
        <CityTitle>{weather.city}</CityTitle>
        <hr />
        <InfoContainer>
          <div>
            <Day>{weather.day}</Day>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
              alt="weatherIcon"
            />
          </div>
          <div>
            <Temperature>
              {weather.temp}
              <span>&deg;</span>
              <span>F</span>
            </Temperature>
            <Description>{weather.description}</Description>
          </div>
        </InfoContainer>
      </WeatherInfo>
    );
  } else {
    return <div>Loading..</div>;
  }
};

const Flex = styled.div`
  display: flex;
`;

const Text = styled.div`
  font-size: 18px;
`;

const WeatherInfo = styled.div`
  width: 100%;
`;

const CityTitle = styled(Flex)`
  justify-content: center;
  font-size: 20px;
`;

const Day = styled(Text)``;

const Temperature = styled(Text)`
  margin-bottom: 10px;
`;

const Description = styled(Text)``;

const InfoContainer = styled(Flex)`
  flex-direction: row;
  justify-content: space-evenly;
`;

export default CurrentWeather;
