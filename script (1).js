const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");

button.addEventListener("click", getWeather);

input.addEventListener("keyup", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = input.value.trim();

  if (!city) {
    result.innerHTML = "<p style='color:red;'>Please enter a city name</p>";
    return;
  }

  result.innerHTML = "Loading... ⏳";

  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const area = data.nearest_area[0].areaName[0].value;
    const region = data.nearest_area[0].region[0].value;
    const country = data.nearest_area[0].country[0].value;
    const temp = data.current_condition[0].temp_C;
    const desc = data.current_condition[0].weatherDesc[0].value;
    const humidity = data.current_condition[0].humidity;
    const wind = data.current_condition[0].windspeedKmph;

    result.innerHTML = `
      <h3>${area}, ${region}, ${country}</h3>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${desc}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${wind} km/h</p>
    `;

  } catch (error) {
    result.innerHTML = "<p style='color:red;'>Error fetching weather data</p>";
    console.error(error);
  }
}

