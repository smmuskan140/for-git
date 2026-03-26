const API_KEY = 'e4d37af6f17162d72c70c674d869d1d5';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

// Fetch weather
async function getWeather(city) {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    showLoading();

    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

    try {
        const response = await axios.get(url);
        displayWeather(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            showError("City not found ❌");
        } else {
            showError("Something went wrong ⚠️");
        }
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
    }
}

// Display weather
function displayWeather(data) {
    const html = `
        <div class="weather-info">
            <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <h3>${Math.round(data.main.temp)}°C</h3>
            <p>${data.weather[0].description}</p>
        </div>
    `;

    document.getElementById("weather-display").innerHTML = html;

    cityInput.focus();
}

// Error
function showError(message) {
    document.getElementById("weather-display").innerHTML = `
        <div class="error-message">
            <h3>⚠️ Error</h3>
            <p>${message}</p>
        </div>
    `;
}

// Loading
function showLoading() {
    document.getElementById("weather-display").innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
}

// Click event
searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city ⚠️");
        return;
    }

    if (city.length < 2) {
        showError("City name too short ❌");
        return;
    }

    getWeather(city);
    cityInput.value = "";
});

// Enter key
cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});