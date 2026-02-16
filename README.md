# Weather App

A lightweight client-side web app that lets you search for a **United States city** and view the current:

- Weather condition
- Temperature (°F)
- Wind speed (mph)
- Humidity (%)

The app uses the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to find US cities and the [Open-Meteo Forecast API](https://open-meteo.com/en/docs) for current weather data.

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

1. Enter a **US city name** (example: `Seattle`).
2. Click **Get Weather**.
3. The app will:
   - Look up a matching city in the United States.
   - Request current weather for that location.
   - Display condition, temperature, wind speed, and humidity.

## Behavior and Error Handling

- If the city field is empty, the app asks you to enter a city name.
- If no US city match is found, the app shows a not-found message.
- If an API request fails, the app shows a retry-later error message.

## Notes

- This app currently limits searches to **United States** cities.
- Units are configured as Fahrenheit for temperature and mph for wind speed.
