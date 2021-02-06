import styled from "styled-components";
// import { useContext } from "react";
// import { WeatherContext } from "../context/weatherContext";

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

const Day = styled(Flex)`
  align-items: center;
  flex-direction: column;
`;

export default Forecast;
