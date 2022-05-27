function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="row">
            <div class="col-sm-6">
              <div class="card-1">
                <div class="card-body">
                  <div class="weather-forecast" id="forecast">
                    <div class="weather-forecast-icon">🌧</div>
                    <div class="weather-forecast-day">
                      ${day}
                     <br />
                      <span class="forecast-temperature-max">9°</span>
                      <span class="forecast-temperature-min">8°</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  </div>
  `;
  });

  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "f1d44160c193232ad174c943fbb6f734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let currentTime = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("London");
displayForecast();
