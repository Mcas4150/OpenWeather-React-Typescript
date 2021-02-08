import React from "react";
import "./App.css";
import { Card } from "@material-ui/core";
import styled from "styled-components";
import CurrentWeather from "./components/weather";
import Forecast from "./components/forecast";

const App = () => {

  return (
    <CardContainer>
      <WeatherCard>
        <CurrentContainer>
          <CurrentWeather />
        </CurrentContainer>
        <ForecastContainer>
          <Forecast />
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
