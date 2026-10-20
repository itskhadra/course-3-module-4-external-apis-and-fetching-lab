
const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

async function fetchWeatherData(state) {
  const abbreviation = state.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(abbreviation)) {
    throw new Error("Please enter a valid two-letter state abbreviation.");
  }

  const response = await fetch(weatherApi + abbreviation);

  if (!response.ok) {
    throw new Error("Unable to fetch weather alerts. Please try again.");
  }

  return await response.json();
}

function displayWeather(data) {
  alertsDisplay.innerHTML = "";

  const alerts = data.features || [];

  const heading = document.createElement("h2");
  heading.textContent = `Weather Alerts: ${alerts.length}`;
  alertsDisplay.appendChild(heading);

  alerts.forEach((alert) => {
    const headline = document.createElement("p");
    headline.textContent =
      alert.properties?.headline || "Weather alert headline unavailable.";
    alertsDisplay.appendChild(headline);
  });
}

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

fetchButton.addEventListener("click", async () => {
  const state = stateInput.value;
  stateInput.value = "";

  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  try {
    const data = await fetchWeatherData(state);
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
});
