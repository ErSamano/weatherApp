# Weather App

A lightweight client-side web app that lets you search for a **city anywhere in the world**, choose your preferred unit system, and view:

- Current weather condition
- Current temperature (°C or °F)
- Current wind speed (km/h or mph)
- Current humidity (%)
- A **3-day weather forecast** with daily condition, high, and low temperatures

The app uses the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to find cities worldwide and the [Open-Meteo Forecast API](https://open-meteo.com/en/docs) for current and forecast weather data.

## Project Structure

- `index.html` – App layout and UI structure
- `styles.css` – App styles
- `script.js` – Search flow, API requests, and rendering logic

## Requirements

- A modern browser (Chrome, Firefox, Safari, Edge, etc.)
- Internet access (for API calls)

No build tools, package managers, or backend are required.

## How to Run

1. Clone or download this repository.
2. Open a terminal in the project folder.
3. Start a simple local web server:

   ```bash
   python3 -m http.server 8000
   ```

4. Open your browser and go to:

   ```
   http://localhost:8000
   ```

> You can also open `index.html` directly, but using a local server is recommended.

## How to Use the App

1. Enter a city name (example: `Tokyo`, `Nairobi`, or `São Paulo`).
2. Choose a unit system:
   - **International (Metric)** for °C and km/h
   - **Imperial (US)** for °F and mph
3. Click **Get Weather**.
4. The app will:
   - Look up a matching city anywhere in the world.
   - Request current weather plus a 3-day forecast for that location.
   - Display current condition, temperature, wind speed, and humidity.
   - Display three daily forecast cards with condition, high, and low temperatures.

## Behavior and Error Handling

- If the city field is empty, the app asks you to enter a city name.
- If no city match is found, the app shows a not-found message.
- If an API request fails, the app shows a retry-later error message.
