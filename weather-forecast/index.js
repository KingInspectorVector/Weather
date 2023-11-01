let now = new Date();

let date = document.querySelector("#date");

let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

date.innerHTML = `${day}, ${hour}:${minutes}`;

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
  
    forecastHTML = forecastHTML + `
    <div class="col-3 d-flex align-items-center">
    <div class="weather-card">
      <div class="day p-1" id="day">
       ${formatDay(forecastDay.dt)}
      </div>
      <img class="daily-icon mx-auto"
        src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
      />
      <div class="forecast-temperatures d-flex justify-content-center p-1">
        <div class="forecast-temperature-min me-3">
          ${Math.round(forecastDay.temp.min)}°
        </div>
        <div class="forecast-temperature-max">
        ${Math.round(forecastDay.temp.max)}°
        </div>
      </div>          
    </div>
    </div>
    `;
        
  }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}


function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperatureCelsius").innerHTML = Math.round(response.data.main.temp);

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "ae1bfd4d9157e0c4ed61bb2a102fa045";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "ae1bfd4d9157e0c4ed61bb2a102fa045";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  search(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleSubmit);

let currentLocationButton = document.getElementById("currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("New York");

// Function to update the temperature display in Celsius
function showCelsius(event) {
  event.preventDefault();
  let temperatureCelsius = document.getElementById("temperatureCelsius");
  temperatureCelsius.textContent = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

// Function to update the temperature display in Fahrenheit
function showFahrenheit(event) {
  event.preventDefault();
  let temperatureCelsius = document.getElementById("temperatureCelsius");
  temperatureCelsius.textContent = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

// Add event listeners to the Celsius and Fahrenheit links
let celsiusLink = document.getElementById("celsiusLink");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.getElementById("fahrenheitLink");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusTemperature = null;