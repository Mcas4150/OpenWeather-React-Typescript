import { useContext } from "react";
import { WeatherContext } from "../context/weatherContext";
import { format, fromUnixTime } from "date-fns";
import { API_KEY,  WEATHER_URL } from "../utils/setAuthToken";

const parseDate = (unixDate: number) => {
  const date = fromUnixTime(unixDate);
  const day = format(date, "EEEE");
  return day;
};

const GetCurrentWeather = async () => {
  const { setWeather } = useContext<any>(WeatherContext);
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

export default GetCurrentWeather;
