import { Request } from 'express';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type DataRequest<T extends any> = Request & { data: T };

export interface ILocation {
  distance: number;
  title: string;
  location_type: string;
  woeid: string;
  latt_long: string;
}

export type ILocationResponse = ILocation[]

export interface IWeatherData {
  id: string,
  weather_state_name: string,
  weather_state_abbr: string,
  weather_state_icon_url: string;
  wind_direction_compass: string,
  created: string, // e.g. "2020-04-01T21:16:04.710379Z"
  applicable_date: string, // e.g. "2020-04-06"
  min_temp: number,
  max_temp: number,
  the_temp: number,
  wind_speed: number,
  wind_direction: number,
  air_pressure: number,
  humidity: number,
  visibility: number,
  predictability: number
};

export interface IWeatherResponse {
  consolidated_weather: IWeatherData[];
}