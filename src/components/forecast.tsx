import styled from "styled-components";

const Forecast = (props: any) => {
  if (props.forecast) {
    return props.forecast.map((day: string) => {
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
            <span>F</span>
          </p>
        </Day>
      );
    });
  } else {
    return <div>Loading</div>;
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

const Day = styled(Flex)`
  align-items: center;
  flex-direction: column;
`;


export default Forecast;