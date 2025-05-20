const apiKey = "a1a65948306111cdcd7ad48ddbcd6cb9"; // Substitua aqui pela sua chave

const searchBtn = document.querySelector(".search-btn");
const input = document.querySelector(".city-input");
const weatherSection = document.querySelector(".weather-info");
const searchMessage = document.querySelectorAll(".section-message")[0];
const notFoundMessage = document.querySelectorAll(".section-message")[1];

// Busca clima
searchBtn.addEventListener("click", () => {
  const city = input.value.trim();
  if (!city) return;
  getWeather(city);
});

async function getWeather(city) {
  showMessage("searching");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    if (!response.ok) throw new Error("Cidade não encontrada");

    const data = await response.json();

    updateWeather(data);
    showMessage("success");
  } catch (error) {
    showMessage("not-found");
    console.error("Erro ao buscar dados:", error);
  }
}

function updateWeather(data) {
  const location = document.querySelector(".country-txt");
  const cityName = document.querySelector(".city-txt");
  const dateText = document.querySelector(".current-date-txt");
  const tempText = document.querySelector(".temp-text");
  const conditionText = document.querySelector(".condition-txt");
  const feelsLikeText = document.querySelector(".feels-like-txt");
  const humidity = document.querySelectorAll(".condition-value")[0];
  const wind = document.querySelectorAll(".condition-value")[1];
  const uv = document.querySelectorAll(".condition-value")[2];
  const pressure = document.querySelectorAll(".condition-value")[3];
  const icon = document.querySelector(".weather-summary-img");

  const now = new Date();
  const options = { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' };
  const formattedDate = now.toLocaleDateString('pt-BR', options);

  location.textContent = data.sys.country;
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  dateText.textContent = formattedDate;
  tempText.textContent = `${Math.round(data.main.temp)} °C`;
  conditionText.textContent = capitalize(data.weather[0].description);
  feelsLikeText.textContent = `Sensação Térmica: ${Math.round(data.main.feels_like)} °C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} km/h`;
  uv.textContent = "—"; // API atual requer chamada separada para UV
  pressure.textContent = `${data.main.pressure} mb`;

  // Escolher ícone
  const weatherMain = data.weather[0].main.toLowerCase();
  icon.src = `assets/weather/${getWeatherIcon(weatherMain)}.svg`;
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function showMessage(state) {
  weatherSection.style.display = "none";
  searchMessage.style.display = "none";
  notFoundMessage.style.display = "none";

  if (state === "success") {
    weatherSection.style.display = "block";
  } else if (state === "searching") {
    searchMessage.style.display = "block";
  } else if (state === "not-found") {
    notFoundMessage.style.display = "block";
  }
}

function getWeatherIcon(condition) {
  const mapping = {
    Clear: "clear.svg",
    Clouds: "clouds.svg",
    Rain: "rain.svg",
    Snow: "snow.svg",
    Drizzle: "drizzle.svg",
    Thunderstorm: "thunderstorm.svg",
    Atmosphere: "atmosphere.svg",
  };

  const icon = iconMap[weather[0].main] || "clouds.svg";
  document.querySelector(".weather-summary-img").src = `assets/weather/${icon}`;

weatherSection.style.display = "block";
messageSections.forEach((el) => (el.style.display = "none"));

  return mapping[condition] || "clear";
}


// Função para inicializar o tema com base na preferência do usuário
function initTheme() {
  const savedTheme = localStorage.getItem('weather-app-theme');
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDarkScheme.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('weather-app-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('weather-app-theme', 'light');
    }
  }
}

document.addEventListener ("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("themeToggle");
  const body = document.body;

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
  });
});
