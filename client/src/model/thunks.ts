import { getLocation, getWeather } from './api';
import { SetLoading, SetError, SetLocation, SetWeather, SelectDay } from './actions';
import { AppDispatch } from '../actions';
import { getWeatherIconURL } from '../meta';
import { AppError } from './types';

export function getWeatherThunk() {
  return (dispatch: AppDispatch) => {
    dispatch(new SetLoading(true));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        getLocation(coords.latitude, coords.longitude)
          // getting closest to user location
          .then(locations => {
            const closest = locations[0];
            dispatch(new SetLocation(closest));
            return closest;
          })
          // getting weather for this location
          .then(location => {
            return getWeather(Number(location.woeid));           
          })
          // injecting weather icon URLs
          .then(weather => {
            return weather.consolidated_weather.map((wth => {
              wth.weather_state_icon_url = getWeatherIconURL(wth.weather_state_abbr);
              return wth;
            }))
          })
          .then(weatherDays => {
            const selectedDayId = weatherDays[0].id;
            dispatch(new SelectDay(selectedDayId));

            // we only need first 6 days
            const neededDays = weatherDays.slice(0, 6);
            dispatch(new SetWeather(neededDays));

            dispatch(new SetLoading(false));
          })
          .catch((err) => {
            dispatch(new SetError(AppError.RequestError));
          });
      }, () => {
        dispatch(new SetError(AppError.GeoLocationError));
      });
    }
  };
}