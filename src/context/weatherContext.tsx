import React, { FC, ReactNode, useState, createContext } from "react";

export const WeatherContext = createContext({});
export const WeatherContextProvider: FC<ReactNode> = ({ children }) => {
  const [weather, setWeather] = useState<any>("");

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
