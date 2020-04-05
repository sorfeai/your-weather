import { IAppState } from "../reducer";
import { createSelector } from 'reselect';

export const getRequestStatusSelector = (state: IAppState) => state.requestStatus;

export const getLocationSelector = (state: IAppState) => state.location;

export const getWeatherSelector = (state: IAppState) => state.weather;

export const getSelectedDaySelector = (state: IAppState) => state.selectedDay;

export const getSelectedDayWeatherSelector = createSelector(
  getSelectedDaySelector,
  getWeatherSelector,
  (selectedDay, weather) => {
    if (selectedDay === null || weather === null) return null;
    return weather.find(wth => wth.id === selectedDay)!;
  }
);