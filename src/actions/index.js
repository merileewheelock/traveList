import axios from 'axios';
import weatherAPIKey from '../config';

const API_key = weatherAPIKey;
const baseURL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_key}`;

export const GET_WEATHERDATA = 'GET_WEATHERDATA';

export function getWeatherData(cityName) {
  const url = `${baseURL}&q=${cityName},us`;
  const request = axios.get(url);

  return {
    type: GET_WEATHERDATA,
    payload: request 
  }
}