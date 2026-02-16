const form = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');
const unitSystemInput = document.querySelector('#unit-system');
const statusBox = document.querySelector('#status');
const weatherCard = document.querySelector('#weather-card');

const locationNode = document.querySelector('#location');
const conditionNode = document.querySelector('#condition');
const temperatureNode = document.querySelector('#temperature');
const windNode = document.querySelector('#wind');
const humidityNode = document.querySelector('#humidity');

const weatherCodeMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

const unitConfig = {
  metric: {
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    temperatureSymbol: '°C',
    windSymbol: 'km/h'
  },
  imperial: {
    temperatureUnit: 'fahrenheit',
    windSpeedUnit: 'mph',
    temperatureSymbol: '°F',
    windSymbol: 'mph'
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const cityName = cityInput.value.trim();
  const unitSystem = unitSystemInput.value;

  if (!cityName) {
    showStatus('Please enter a city name.', true);
    return;
  }

  showStatus('Loading weather...');
  weatherCard.classList.add('hidden');

  try {
    const city = await findCity(cityName);

    if (!city) {
      showStatus('City not found. Try another search.', true);
      return;
    }

    const weather = await fetchWeather(city.latitude, city.longitude, unitSystem);
    renderWeather(city, weather, unitSystem);
    showStatus('');
  } catch (error) {
    console.error(error);
    showStatus('Unable to fetch weather right now. Please try again later.', true);
  }
});

function showStatus(message, isError = false) {
  statusBox.textContent = message;
  statusBox.style.color = isError ? '#8f1d1d' : '#1f4d8f';
}

async function findCity(cityName) {
  const geoUrl = new URL('https://geocoding-api.open-meteo.com/v1/search');
  geoUrl.searchParams.set('name', cityName);
  geoUrl.searchParams.set('count', '10');
  geoUrl.searchParams.set('language', 'en');
  geoUrl.searchParams.set('format', 'json');

  const response = await fetch(geoUrl);

  if (!response.ok) {
    throw new Error(`Geocoding lookup failed: ${response.status}`);
  }

  const payload = await response.json();
  const results = payload.results ?? [];

  return results[0] ?? null;
}

async function fetchWeather(latitude, longitude, unitSystem) {
  const units = unitConfig[unitSystem] ?? unitConfig.metric;
  const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast');
  weatherUrl.searchParams.set('latitude', latitude.toString());
  weatherUrl.searchParams.set('longitude', longitude.toString());
  weatherUrl.searchParams.set('current', 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code');
  weatherUrl.searchParams.set('temperature_unit', units.temperatureUnit);
  weatherUrl.searchParams.set('wind_speed_unit', units.windSpeedUnit);

  const response = await fetch(weatherUrl);

  if (!response.ok) {
    throw new Error(`Weather lookup failed: ${response.status}`);
  }

  const payload = await response.json();

  if (!payload.current) {
    throw new Error('Current weather data is missing in API response.');
  }

  return payload.current;
}

function renderWeather(city, weather, unitSystem) {
  const units = unitConfig[unitSystem] ?? unitConfig.metric;
  const area = city.admin1 ? `${city.name}, ${city.admin1}` : city.name;
  const location = city.country ? `${area}, ${city.country}` : area;

  locationNode.textContent = location;
  conditionNode.textContent = weatherCodeMap[weather.weather_code] ?? 'Weather condition unavailable';
  temperatureNode.textContent = `${Math.round(weather.temperature_2m)} ${units.temperatureSymbol}`;
  windNode.textContent = `${Math.round(weather.wind_speed_10m)} ${units.windSymbol}`;
  humidityNode.textContent = `${weather.relative_humidity_2m}%`;

  weatherCard.classList.remove('hidden');
}
