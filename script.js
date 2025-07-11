const apiKey = "c7febcd0b8c73d833997c03ca1b5ae4d";
const apiURL ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");


async function checkWeather(city) {
  const respose = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (respose.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    let data = await respose.json();
    document.querySelector(".city").innerHTML = data.name; //update city name
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " °C"; //update temp
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %"; //update temp
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; //update wind speed
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
    weather.style.display = "block";
    error.style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});


const toggleBtn = document.getElementById("mode-toggle");
const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  modeToggle.innerHTML = isDark
    ? 'Light Mode <i class="fa-solid fa-sun"></i>'
    : 'Dark Mode <i class="fa-solid fa-moon"></i>';
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    modeToggle.innerHTML = 'Light Mode <i class="fa-solid fa-sun"></i>';
  }
});
