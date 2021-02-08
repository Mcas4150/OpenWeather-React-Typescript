import styled from "styled-components";
import { useState, useEffect } from "react";
import { API_KEY, FORECAST_URL } from "../utils/setAuthToken";
import { parseDate } from "../utils/shared";

const Forecast = () => {
  const [forecast, setForecast] = useState<any>("");
  // const [forecast, setForecast] = useState<Forecast | null>({
  //   day: "",
  //   tempMax: 0,
  //   tempMin: 0,
  //   description: "",
  //   icon: "",
  // });

  const getForecast = async () => {
    const response = await fetch(
      `${FORECAST_URL}?q=Boston&units=imperial&APPID=${API_KEY}`
    );
    const data = await response.json();
    if (data.list) {
      const weatherList = data.list;
      const fiveDayForecast: any[] = [];
      for (let i = 1; i < weatherList.length; i += 8) {
        const day = parseDate(weatherList[i].dt, "EEEEEE");
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
    getForecast();
  }, []);

  if (forecast) {
    return forecast.map((data: any) => {
      const [day, icon, description, tempMin, tempMax] = data;
      return (
        <Item key={day}>
          <Day>{day}</Day>
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt="weatherIcon"
          />
          <Description>{description}</Description>
          <TempMax>
            {tempMax}
            <span>&deg;</span>
            <span>F</span>
          </TempMax>
          <TempMin>
            {tempMin}
            <span>&deg;</span>
            <span>F</span>
          </TempMin>
        </Item>
      );
    });
  } else {
    return <div>Loading</div>;
  }
};

const Flex = styled.div`
  display: flex;
`;

const Text = styled.div`
  font-size: 15px;
`;

const Day = styled(Text)``;

const TempMin = styled(Text)`
  color: blue;
`;

const TempMax = styled(Text)`
  color: red;
`;

const Description = styled(Text)`
  margin-bottom: 5px;
`;

const Item = styled(Flex)`
  align-items: center;
  flex-direction: column;
`;

export default Forecast;
