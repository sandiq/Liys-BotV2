/**
* Base By NdyZz [ github.com/NdyZz ]
* Created On 1/7/2024
* Contact Me on wa.me/6285346923840
*/

const fetch = require('node-fetch');

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  return await response.json();
};

const getCodeCountries = async () => {
  const response1 = await fetchData("https://virtual-number.p.rapidapi.com/api/v1/e-sim/all-countries", {
    method: 'GET',
    headers: {
      "X-RapidAPI-Host": "virtual-number.p.rapidapi.com",
      "X-RapidAPI-Key": "bed59890e2msh9a0ad7ee9ca105fp17cebfjsne434c3f14a60"
    }
  });
  return response1;
};

const getCountryNumbers = async (countryCode) => {
  const response2 = await fetchData(`https://virtual-number.p.rapidapi.com/api/v1/e-sim/country-numbers?countryId=${countryCode}`, {
    method: 'GET',
    headers: {
      "X-RapidAPI-Host": "virtual-number.p.rapidapi.com",
      "X-RapidAPI-Key": "bed59890e2msh9a0ad7ee9ca105fp17cebfjsne434c3f14a60"
    }
  });
  return response2;
};

const getViewMessages = async (countryCode, number) => {
  const response3 = await fetchData(`https://virtual-number.p.rapidapi.com/api/v1/e-sim/view-messages?countryId=${countryCode}&number=${number}`, {
    method: 'GET',
    headers: {
      "X-RapidAPI-Host": "virtual-number.p.rapidapi.com",
      "X-RapidAPI-Key": "bed59890e2msh9a0ad7ee9ca105fp17cebfjsne434c3f14a60"
    }
  });
  return response3;
};

module.exports = {
  getCodeCountries,
  getCountryNumbers,
  getViewMessages,
};