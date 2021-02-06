import styled from "styled-components";

const CurrentWeather = (props: any) => {
  if (props.weather) {
    const [temp, description, day, city, icon] = props.weather[0];
    return (
      <WeatherInfo>
        <CityTitle>{city}</CityTitle>
        <hr />
        <InfoContainer>
          <div>
            <div>{day}</div>
            <img
              src={`http://openweathermap.org/img/wn/${icon}.png`}
              alt="weatherIcon"
            />
          </div>
          <div>
            <div>{temp}</div>
            <div>{description}</div>
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

const WeatherInfo = styled.div`
  width: 100%;
`;

const CityTitle = styled(Flex)`
  justify-content: center;
  font-size: 20px;
`;

const InfoContainer = styled(Flex)`
  flex-direction: row;
  justify-content: space-evenly;
`;

export default CurrentWeather;
