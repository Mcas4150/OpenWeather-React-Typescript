import { useContext } from "react";
import { WeatherContext } from "../context/weatherContext";
import { format, fromUnixTime } from "date-fns";

const API_KEY = "7c16e6a570b4c78f8d52988d25382b1b";
const WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather";

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
