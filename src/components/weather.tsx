import styled from "styled-components";
// import { FC, ReactNode, useContext, useEffect } from "react";
// import { WeatherContext } from "../context/weatherContext";
// import GetCurrentWeather from "./openWeather";

const CurrentWeather = (props: any) => {
  // const { weather } = useContext<any>(WeatherContext);

  // useEffect(() => {
  //   GetCurrentWeather();
  // }, []);

  if (props.weather) {
    const [temp, description, day, city, icon] = props.weather[0];
    return (
      <WeatherInfo>
        <CityTitle>{city}</CityTitle>
        <hr />
        <InfoContainer>
          <div>
            <Day>{day}</Day>
            <img
              src={`http://openweathermap.org/img/wn/${icon}.png`}
              alt="weatherIcon"
            />
          </div>
          <div>
            <Temperature>
              {temp}
              <span>&deg;</span>
              <span>F</span>
            </Temperature>
            <Description>{description}</Description>
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
