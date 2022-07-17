// search Form
var city = document.querySelector("#city-name");
var searchPlace = document.querySelector("#exampleDataList");
let apiKey = "8fa673d34c240a0cb12974c973229b0e";
var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function showDailyForecast(coordinates) {
  let apiKey = "8fa673d34c240a0cb12974c973229b0e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getDisplayForecast);
}

function formatDayWithTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  // let day = date.getDate()
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
   let day = `${days[date.getDay()]}`;
  return day;
}
function formatDates(timestamp) {
  let date = new Date(timestamp * 1000);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let info = `${date.getDate()} ${months[date.getMonth()]}`;
  return info;
}

function getDisplayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast-place");
  let forecasts = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecasts.forEach(function (dayForecast, index) {
    if (index !== 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col next-weather-item">
    <img
      src="images/${dayForecast.weather[0].icon}.png"
      alt=""
      width="40"
      class="images"
    />
    <div class="day" id="day-o(ne">
      ${formatDayWithTimestamp(dayForecast.dt)}
    </div>
    <div class="date" id="date-one">
      ${formatDates(dayForecast.dt)}
    </div>
    <div class="temp"> <span id="forecast-min">${Math.round(
      dayForecast.temp.min
    )}</span>° / <span id="forecast-max">${Math.round(
          dayForecast.temp.max
        )}</span>°</div>
  </div>`;
    }
    });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;

}

function searchFormCity(event) {
  event.preventDefault();
  const arr = searchPlace.value.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const searchPlaceGoorView = arr.join(" ");
  city.innerHTML = searchPlaceGoorView;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCurrent);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFormCity);

function currentPosition(position) {
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCurrent);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let searchCurrent = document.querySelector("#local-button");
searchCurrent.addEventListener("click", getCurrentLocation);

function weatherCurrent(response) {
  celsiusTemp = response.data.main.temp;
  f.innerHTML = "/°F";
  c.innerHTML = "°C";
  let currentTemperature = Math.round(celsiusTemp);
  let weatherSentens = document.querySelector("#temp");
  let weatherIcon = document.querySelector("#weatherIcon");
  let weatherName = document.querySelector("#name-weather");
  let weatherDescription = document.querySelector("#description-weather");
  let maxTemp = document.querySelector("#high");
  let minTemp = document.querySelector("#low");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let presure = document.querySelector("#presure");
  let minTemperature = Math.round(response.data.main.temp_min);
  let maxTemperature = Math.round(response.data.main.temp_max);

  weatherSentens.innerHTML = `${currentTemperature}`;
  city.innerHTML = `${response.data.name}`;
  weatherIcon.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  weatherName.innerHTML = `${response.data.weather[0].main}`;
  weatherDescription.innerHTML = capitalizeFirstLetter(
    `${response.data.weather[0].description}`
  );
  minTemp.innerHTML = `${minTemperature}`;
  maxTemp.innerHTML = `${maxTemperature}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${response.data.wind.speed}`;
  presure.innerHTML = `${response.data.main.pressure}`;
  showDailyForecast(response.data.coord);
}
axios.get(apiUrl).then(weatherCurrent);
// Date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let zeroHours = "";
  if (`${date.getHours()}`.length <= 1) {
    zeroHours = "0";
  } else {
    zeroHours = "";
  }

  let zeroMinute = "";
  if (`${date.getMinutes()}`.length <= 1) {
    zeroMinute = "0";
  } else {
    zeroMinute = "";
  }
  let info = `${
    days[date.getDay()]
  }, ${zeroHours}${date.getHours()}:${zeroMinute}${date.getMinutes()}`;
  return info;
}
let dateString = document.querySelector("#date-string");
dateString.innerHTML = formatDate(new Date());

let temp = document.querySelector("#temp");

function changTemptrue(event) {
  event.preventDefault();
  
  if (f.innerHTML === "/°C") {
    f.innerHTML = "/°F";
    c.innerHTML = "°C";
    let temp = document.querySelector("#temp");
    let maxTemp = document.querySelector("#high");
    let minTemp = document.querySelector("#low");
    let cTemp = celsiusTemp;
    let cMinTemp = ((minTemp.innerHTML - 32) * 5) / 9;
     let cMaxTemp = ((maxTemp.innerHTML - 32) * 5) / 9;
    temp.innerHTML = Math.round(cTemp);
    maxTemp.innerHTML = Math.round(cMaxTemp);
    minTemp.innerHTML = Math.round(cMinTemp);
  } else {
    f.innerHTML = "/°C";
    c.innerHTML = "°F";
    let temp = document.querySelector("#temp");
    let maxTemp = document.querySelector("#high");
    let minTemp = document.querySelector("#low");
    let fTemp = (celsiusTemp * 9) / 5 + 32;
    let fMinTemp = (minTemp.innerHTML * 9) / 5 + 32;
    let fMaxTemp = (maxTemp.innerHTML * 9) / 5 + 32;
    temp.innerHTML = Math.round(fTemp);
    maxTemp.innerHTML = Math.round(fMaxTemp);
    minTemp.innerHTML = Math.round(fMinTemp);
  }
}
let celsiusTemp = null;
let f = document.querySelector("#f");
let c = document.querySelector("#c");
f.addEventListener("click", changTemptrue);



