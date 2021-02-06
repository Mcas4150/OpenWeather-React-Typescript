import styled from "styled-components";
// import { useContext } from "react";
// import { WeatherContext } from "../context/weatherContext";

const Forecast = (props: any) => {
  if (props.forecast) {
    return props.forecast.map((data: any) => {
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
