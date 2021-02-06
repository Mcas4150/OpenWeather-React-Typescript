interface IWeather {
  temp: number;
  city: string;
  description: string;
}

type ContextType = {
  weather: IWeather[];
  setWeather: (weather: IWeather) => void;
};
