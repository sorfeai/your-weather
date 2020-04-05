import { ILocation, IWeatherData } from "./types";
import { RequestStatus } from '../types';

export const SET_REQUEST_STATUS = "SET_REQUEST_STATUS";
export const SET_LOCATION = "SET_LOCATION";
export const SET_WEATHER = "SET_WEATHER";
export const SELECT_DAY = "SELECT_DAY";

export class SetRequestStatus {
  public readonly type = SET_REQUEST_STATUS;
  constructor(public payload: RequestStatus) {}
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
  | typeof SET_REQUEST_STATUS
  | typeof SET_LOCATION
  | typeof SET_WEATHER
  | typeof SELECT_DAY;

export type LocationAction =
  | SetRequestStatus
  | SetLocation
  | SetWeather
  | SelectDay;
