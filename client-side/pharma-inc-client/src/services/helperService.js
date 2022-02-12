import axios from "axios";

export const helperService = {
  getNationalities,
  getCountries
};

async function getNationalities() {
  try {
    const response = await axios.get("https://countriesnow.space/api/v0.1/countries/iso");
    const nationalities = response.data.data.map(country =>{
      return country.Iso2
    })
    return nationalities
  } catch (error) {
    console.error(error);
  }
}

async function getCountries() {
  try {
    const response = await axios.get("https://countriesnow.space/api/v0.1/countries/iso");
    const countriesName = response.data.data.map(country =>{
      return country.name
    })
    return countriesName
  } catch (error) {
    console.error(error);
  }
}
