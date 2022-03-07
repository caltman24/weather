require("dotenv").config();
const fetch = require("cross-fetch");
const API_KEY = process.env.API_KEY;

const fetchWeather = async (option, zip) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/${option}.json?key=${API_KEY}&q=${zip}&aqi=no`
  );
  if (res.ok) {
    console.log(`Status: ${res.status}\nSuccess`);
    const data = await res.json();
    return data;
  } else {
    console.log("Not Successful", res.status);
  }
};

fetchWeather("current", 46773).then((data) => {
  //console.log(data);

  let weather = {
    location: {},
    current: {},
  };

  for (let i in data) {
    if (i === "location") {
      weather.location.name = data[i]["name"];
      weather.location.region = data[i]["region"];
      weather.location.country = data[i]["country"];
      //console.log(`${location.name}, ${location.region}, ${location.country}`);
    } else if (i === "current") {
      weather.current.temp_c = data[i]["temp_c"].toString();
      weather.current.temp_f = data[i]["temp_f"].toString();

      weather.current.wind_mph = data[i]["wind_mph"].toString();
      weather.current.wind_dir = data[i]["wind_dir"];

      weather.current.feelslike_c = data[i]["feelslike_c"].toString();
      weather.current.feelslike_f = data[i]["feelslike_f"].toString();

      weather.current.conditionText = data[i]["condition"].text;
      weather.current.conditionIcon = data[i]["condition"].icon;
    }
  }

  const { name, region, country } = weather.location;
  const {
    temp_c,
    temp_f,
    wind_mph,
    wind_dir,
    feelslike_c,
    feelslike_f,
    conditionText,
    conditionIcon,
  } = weather.current;

  const degreeCode = "\u00B0";

  const locationString = `${name}, ${region}, ${country}`;
  const tempString = `${temp_f}${degreeCode}F (${temp_c}${degreeCode}C)\nFeels Like: ${feelslike_f}${degreeCode}F (${feelslike_c}${degreeCode}C)`;
  const windString = `Winds: ${wind_mph}mph ${wind_dir}`;
  const conditionString = `${conditionText} - ${conditionIcon}`;

  console.log(
    `\n${locationString}\n${tempString}\n${conditionString}\n${windString}\n`
  );
});


