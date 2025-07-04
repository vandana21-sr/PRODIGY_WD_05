const apiKey = '93e07eced2af9c9c12163ceab0bcea1b';

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const { name, main, weather, sys } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherInfo.innerHTML = `
      <h2>${name}, ${sys.country}</h2>
      <p><img src="${iconUrl}" alt="${weather[0].description}" /> ${weather[0].main} (${weather[0].description})</p>
      <p>🌡️ Temperature: ${main.temp}°C</p>
      <p>💧 Humidity: ${main.humidity}%</p>
      <p>🔻 Min: ${main.temp_min}°C | 🔺 Max: ${main.temp_max}°C</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
