import { ILocationResponse, IWeatherResponse } from './types';
import { API_HOST, API_PORT, API_LOCATION, API_WEATHER } from '../meta';

export function getLocation(latitude: number, longitude: number) {
  const url = `http://${API_HOST}:${API_PORT}${API_LOCATION}/?lattlong=${latitude},${longitude}`;
  return (fetch(url).then(res => res.json()) as unknown) as Promise<ILocationResponse>;
};

export function getWeather(woeid: number) {
  const url = `http://${API_HOST}:${API_PORT}${API_WEATHER}/${woeid}`;
  return (fetch(url).then(res => res.json()) as unknown) as Promise<IWeatherResponse>;
};