import { ILocation, IWeatherData, AppError } from './types';

export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_LOCATION = "SET_LOCATION";
export const SET_WEATHER = "SET_WEATHER";
export const SELECT_DAY = "SELECT_DAY";

export class SetLoading {
  public readonly type = SET_LOADING;
  constructor(public payload: boolean) {}
}

export class SetError {
  public readonly type = SET_ERROR;
  constructor(public payload: AppError) {}
}

export class SetLocation {
  public readonly type = SET_LOCATION;
  constructor(public payload: ILocation) {}
}

export class SetWeather {
  public readonly type = SET_WEATHER;
  constructor(public payload: IWeatherData[]) {}
}

export class SelectDay {
  public readonly type = SELECT_DAY;
  constructor(public payload: string) {}
}

export type LocationActionType =
  | typeof SET_LOADING
  | typeof SET_LOCATION
  | typeof SET_WEATHER
  | typeof SELECT_DAY;

export type LocationAction =
  | SetLoading
  | SetError
  | SetLocation
  | SetWeather
  | SelectDay;
