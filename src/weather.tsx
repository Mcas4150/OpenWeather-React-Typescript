// import React, {useState, useEffect} from "react";





// const Weather = () => {

//   const [data, setData] = useState("");
//   const [count, setCount] = useState(0)

// // useEffect(() => {
// //   const key = "weather?id=";
// //   let cityId: number = 357900;
// //   getWeather();
// // }, [])

//   const DEFAULT_UNIT = "imperial";
//   // normally hidden from github in .env config file, but left public for demo use
//   let apiKey = "a3ec3c40eccd28d909b1bb6ecfe621c0";
//   // let requestUrl = `${OPEN_WEATHER_MAP_URL}${key}${location}&appid=${apiKey}&units=${DEFAULT_UNIT}`;
//   let cityName: string = "boston";
//  const OPEN_WEATHER_MAP_URL = "https://api.openweathermap.org/data/2.5/";
//  let requestUrl = `${OPEN_WEATHER_MAP_URL}weather?q=${cityName}&appid=${apiKey}`
//  const getData = () =>
//  fetch(`api.openweathermap.org/data/2.5/weather?q=London&appid=bad5d5a9937f41caa4bf456a621b952d`)
//    .then((res) => res.json())

// useEffect(() => {
//  getData().then((data) => setData(data))
// }, [])
// // const getWeather = () => {


// //   fetch(`api.openweathermap.org/data/2.5/weather?q=London&appid=bad5d5a9937f41caa4bf456a621b952d`)

// //     .then((res => res.json())

// //     useEffect(() => {
// //       getWeather().then((data) => setData(data))
// //     }, [])


// const [inputValue, setInputValue] = useState("")
//   const[error, setError] = useState()
//   const [weatherData, setWeatherData] = useState({
//     date: '',
//     temp: '',
//     pressure: '',
//     location: 'In the middle of nowhere, please type in your city',
//     weatherDefinition: ''
//   })
//   // const handleInputChange = e =>{
//   //   setInputValue(e.target.value)
//   // }
//   const handleCitySubmit = () =>{

//     console.log("form submitted")
//     const API = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=c2254a1ace1ebfa4d5bb08211abed3eb&units=metric';
//     fetch(API)
//       .then(response => {
//         if(response.ok){
//           return response
//         }
//         throw Error("nie udało się")
//       })
//       .then(response => response.json())
//       .then(data => {
//         // setError(false)
//         setWeatherData({
//           temp: data.main.temp,


//         })
//         console.log(data)
//       })
//       .catch(err => {
//         // setError(true)
//       })
//   }



//   return (
//     <div className="App">
//       <div className="app-wrapper">
//       <div className="Form">
//      <button>
//      onClick = {handleCitySubmit}
//      </button>
//      </div>
//      {weatherData.temp}
//      {/* <Result
//      location={weatherData.location}
//      weatherDefinition={weatherData.weatherDefinition}
//      pressure={weatherData.pressure}
//      temp={weatherData.temp}
//      /> */}
//      </div>
//     </div>
//   );

// return (
// <div>
//  hey Im weather {data && <div>{data}</div>} {count}

// </div>

// )


// }


// export default Weather;
