const API_KEY = "7c16e6a570b4c78f8d52988d25382b1b";

const OpenWeather = {
  fetchDays(city: String) {
    return fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  },
  fetchCurrent(city: string) {
    return fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  },
  // fetchCurrent(city) {
  //     return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`).then((response) => {
  //         return response.json();
  //     }).then((data) => {
  //         return data;
  //     });
  // }
};

export default OpenWeather;
