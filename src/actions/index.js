import axios from 'axios';
import config from '../config';

const API_key = config.weatherAPIKey;
const baseURL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_key}`;

export const GET_WEATHERDATA = 'GET_WEATHERDATA';

export function getWeatherData(cityName) {
  const url = `${baseURL}&q=${cityName},us&units=imperial`;
  const request = axios.get(url);
  // console.log("*****WEATHER URL*****")
  // console.log(url)

  return {
    type: GET_WEATHERDATA,
    payload: request 
  }
}