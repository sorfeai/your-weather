import { WeatherState } from './types';

const isProd = process.env.NODE_ENV === 'production';

export const API_HOST = isProd 
  ? process.env.REACT_APP_PRODUCTION_HOST 
  : process.env.REACT_APP_DEVELOPMENT_HOST;

export const API_PORT = isProd 
  ? 443 
  : process.env.REACT_APP_DEVELOPMENT_PORT;

export const API_LOCATION = '/api/location';
export const API_WEATHER = '/api/weather';

export const getWeatherIconURL = (state: WeatherState) => 
  `https://www.metaweather.com/static/img/weather/${state}.svg`;