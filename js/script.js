//  required api
//  https://flagcdn.com/w640/gb.png
//  https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city},${country}
//  https://cors-anywhere.herokuapp.com/https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city},${country}

// select containers
const mainContainer = document.querySelector(".ch-app-body");
const countryContainer = document.querySelector(".country-data");
const conditionContainer = document.querySelector(".condition-data");
const windContainer = document.querySelector(".wind-data-container");
const humidityContainer = document.querySelector(".humidity-data");
const flagContainer = document.querySelector(".flag-data");
const tempContainer = document.querySelector(".temp-data");
const cityInput = document.querySelector("#cityinput").value;
const countryInput = document.querySelector(".country-data-field").value;
const button = document.querySelector(".glass-button");

//country code finder
async function getCountryCode(countryName) {
  try {
    const response = await fetch("countries.json");
    const countryList = await response.json();

    const country = countryList.find(
      (c) => c.Name.toLowerCase() === countryName?.toLowerCase()
    );

    return country ? country.Code : null;
  } catch (error) {
    console.error("Error fetching country list:", error);
    return null;
  }
}

// country flag generator
const getFlagImg = async (country) => {
  const countryName = country;
  const countryCode = await getCountryCode(countryName);

  if (countryCode) {
    console.log(`The country code for ${countryName} is ${countryCode}.`);
    const flagImg = `https://flagcdn.com/w640/${countryCode.toLowerCase()}.png`;

    return flagImg;
  } else {
    console.log("Country not found.");
    return false;
  }
};

// Class definition
class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getWeather(city, country) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city},${country}`
      );
      const data = await response.json();
      const flagImg = await getFlagImg(country);

      return { data, flagImg };
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  // Display weather data on the page
  displayWeather(value) {
    let { data, flagImg } = value;
    console.log("weatherData", data);
    console.log("flag:", flagImg);
    let weatherData = data;
    if (!weatherData) {
      mainContainer.innerHTML =
        "not data found associated with this city or country";
      return;
    }
    flagImg = !flagImg
      ? "https://img.icons8.com/?size=512&id=j1UxMbqzPi7n&format=png"
      : flagImg;

    countryContainer.innerHTML = weatherData?.location.name
      ? `<span class="mr-2">${weatherData?.location.name}</span>`
      : "notfound";
    conditionContainer.innerHTML = weatherData?.current.condition.text;
    windContainer.innerHTML = `${weatherData?.current.wind_kph} km/h`;
    humidityContainer.innerHTML = weatherData?.current.humidity;
    flagContainer.src = flagImg;
    tempContainer.innerHTML = `${weatherData?.current.temp_c}°`;
  }
}

// Create a new instance of the WeatherApp class

const weatherCallFunction = async (city, country) => {
  const apiKey = "d6c3fa7a15384efc97073333232006";
  const app = new WeatherApp(apiKey);
  const weatherData = await app.getWeather(city, country);

  if (weatherData?.data?.error?.code === 1006) {
    mainContainer.innerHTML =
      "not data found associated with this city or country";
    setTimeout(() => {
      location.reload(true);
    }, 3000);
    return;
  }
  app.displayWeather(weatherData);
};
// weatherCallFunction(city, country);
weatherCallFunction("Dhaka", "Bangladesh");

button.addEventListener("click", (e) => {
  e.preventDefault();
  let countryInput = document.querySelector(".country-data-field").value;

  let cityInput = document.querySelector(".city-data-field").value;
  if (!cityInput || !countryInput) {
    alert("Please enter city and country name");
    return;
  }

  weatherCallFunction(cityInput, countryInput);
});
