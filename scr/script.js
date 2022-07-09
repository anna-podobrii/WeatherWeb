// search Form
var city = document.querySelector("#city-name");
var country = document.querySelector("#country");
var searchPlace = document.querySelector("#exampleDataList");
function searchFormCity(event) {
  event.preventDefault();
  const arr = searchPlace.value.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const searchPlaceGoorView = arr.join(" ");
  city.innerHTML = searchPlaceGoorView;
  let apiKey = "8fa673d34c240a0cb12974c973229b0e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=metric`;
  function weather(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let weatherSentens = document.querySelector("#temp");
    weatherSentens.innerHTML = `${currentTemperature}`;
    country.innerHTML = `${response.data.sys.country}`;
  }
  axios.get(apiUrl).then(weather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFormCity);

function currentPosition(position) {
  let apiKey = "8fa673d34c240a0cb12974c973229b0e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  function weatherCurrent(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let weatherSentens = document.querySelector("#temp");
    weatherSentens.innerHTML = `${currentTemperature}`;
    city.innerHTML = `${response.data.name}`;
    country.innerHTML = `${response.data.sys.country}`;
  }

  axios.get(apiUrl).then(weatherCurrent);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let searchCurrent = document.querySelector("#local-button");
searchCurrent.addEventListener("click", getCurrentLocation);

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

// Next Day Set
function formatDays(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let info = `${days[date.getDay()]}`;
  return info;
}
function formatDates(date) {
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

  let info = `${date.getDate()}, ${months[date.getMonth()]}`;
  return info;
}
function nextDaysInfo(dayString, dateString, dayNumber) {
  var day = new Date();
  var nextDay = new Date(day);
  let dayOne = document.querySelector(dayString);
  let dateOne = document.querySelector(dateString);
  nextDay.setDate(day.getDate() + dayNumber);
  dayOne.innerHTML = formatDays(nextDay);
  dateOne.innerHTML = formatDates(nextDay);
}
nextDaysInfo("#day-one", "#date-one", 1);
nextDaysInfo("#day-two", "#date-two", 2);
nextDaysInfo("#day-three", "#date-three", 3);
nextDaysInfo("#day-four", "#date-four", 4);
nextDaysInfo("#day-five", "#date-five", 5);

// Temperature

let c = document.querySelector("#c");
let f = document.querySelector("#f");
let temp = document.querySelector("#temp");
let tempC = 20;
let tempF = (tempC * 9) / 5 + 32;
function changTemp(event) {
  if (f.innerHTML === "/°C") {
    f.innerHTML = "/°F";
    c.innerHTML = "°C";
    temp.innerHTML = `${tempC}`;
  } else {
    f.innerHTML = "/°C";
    c.innerHTML = "°F";
    temp.innerHTML = `${tempF}`;
  }
}
f.addEventListener("click", changTemp);
