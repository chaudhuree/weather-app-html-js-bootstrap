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
let cityname;
let countryname;

//country code finder for flag
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

// country flag intializer
const getFlagImg = async (country) => {
  const countryName = country;
  const countryCode = await getCountryCode(countryName);

  if (countryCode) {
    // console.log(`The country code for ${countryName} is ${countryCode}.`);
    const flagImg = `https://flagcdn.com/w640/${countryCode.toLowerCase()}.png`;

    return flagImg;
  } else {
    // console.log("Country not found.");
    return false;
  }
};

// get location from browser
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
//success callback for location
async function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=9f5df757f865467f81bb6204fe96f871&q=${latitude}+${longitude}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const city = data.results[0].components.state;
    const country = data.results[0].components.country;

    // console.log("City: " + city);
    // console.log("Country: " + country);

    /*
    if location is enabled then call the weather function with the city and country
    */
    weatherCallFunction(city, country);
  } catch (error) {
    console.log("Error occurred while fetching location: " + error);
    mainContainer.innerHTML =
      "something went wrong,please try again later,for now we are showing Dhaka,BD";
    setTimeout(() => {
      weatherCallFunction("Dhaka", "Bangladesh");
    }, 3000);
  }
}

//error callback for location
function errorCallback(error) {
  console.log(
    "Error occurred. Error code: " +
      error.code +
      ". Error message: " +
      error.message
  );
  if (error.code === 1) {
    alert("Please allow location access,for now we are showing Dhaka,BD");
    weatherCallFunction("Dhaka", "Bangladesh");
  }
}
getLocation();

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
    // console.log("weatherData", data);
    // console.log("flag:", flagImg);
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
    humidityContainer.innerHTML = `${weatherData?.current.humidity}%`;
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
// weatherCallFunction("Dhaka", "Bangladesh");

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
