const apiKey = "a065440cb7552b96ee03e204071f8239"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const submitButton = document.getElementById("submitButton");
const weatherInfo = document.getElementById("weatherInfo");
const loadingSpinner = document.getElementById("loadingSpinner");
const errorMessage = document.getElementById("errorMessage");

submitButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }
  
  fetchWeather(city);
});

async function fetchWeather(city) {
  showLoading(true);
  clearMessages();

  try {
    const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found or invalid API request.");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

function displayWeather(data) {
  const { name, main: { temp, humidity }, weather, wind: { speed } } = data;
  const description = weather[0].description;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

  weatherInfo.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p><img src="${iconUrl}" alt="Weather icon"> ${description}</p>
    <p>Temperature: ${temp}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${speed} m/s</p>
  `;
  weatherInfo.style.display = "block";
}

function showLoading(isLoading) {
  loadingSpinner.style.display = isLoading ? "block" : "none";
}

function clearMessages() {
  weatherInfo.style.display = "none";
  errorMessage.textContent = "";
}

function showError(message) {
  errorMessage.textContent = message;
}
