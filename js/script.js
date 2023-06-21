//  required api
//  https://flagcdn.com/w640/gb.png
//  https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city},${country}
//  https://cors-anywhere.herokuapp.com/https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city},${country}

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
  displayWeather({ data: weatherData, flagImg }) {
    console.log("weatherData", weatherData);
    console.log("flagImg", flagImg);

    flagImg = !flagImg
      ? "https://img.icons8.com/?size=512&id=j1UxMbqzPi7n&format=png"
      : flagImg;

    const weatherElement = document.getElementById("weather");
    weatherElement.innerHTML = `
      <h2>${weatherData?.current.temp_c}°C in ${weatherData?.location.name}, ${weatherData?.location.country}</h2>
      <p>${weatherData.current.condition.text}</p>
      <p>${weatherData.current.wind_kph} km/h winds</p>
      <p>Humidity: ${weatherData.current.humidity}%</p>
      <img src="${flagImg}" alt="flag" width="50px"/>

    `;
  }
}

// Create a new instance of the WeatherApp class

const apiKey = "d6c3fa7a15384efc97073333232006";
const app = new WeatherApp(apiKey);

const city = "Dhaka";
const country = "Bangladesh";
app.getWeather(city, country).then((weatherData) => {
  app.displayWeather(weatherData);
});

//country code finder
async function getCountryCode(countryName) {
  try {
    const response = await fetch("countries.json");
    const countryList = await response.json();

    const country = countryList.find(
      (c) => c.Name.toLowerCase() === countryName.toLowerCase()
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
    // console.log(flagImg);
    return flagImg;
  } else {
    return false;
    console.log("Country not found.");
  }
};
