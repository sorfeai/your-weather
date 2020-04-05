import { getLocation, getWeather } from './api';
import { SetRequestStatus, SetLocation, SetWeather, SelectDay } from './actions';
import { AppDispatch } from '../actions';
import { getWeatherIconURL } from '../meta';
import { RequestStatus } from '../types';

export function getWeatherThunk() {
  return (dispatch: AppDispatch) => {
    dispatch(new SetRequestStatus(RequestStatus.pending));

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
          .then(weatherList => {
            // selecting current day
            const selectedDayId = weatherList[0].id;
            dispatch(new SelectDay(selectedDayId));

            // setting weather data
            dispatch(new SetWeather(weatherList));

            // request succeeded
            dispatch(new SetRequestStatus(RequestStatus.succeed));
          });
      });
    } else { 
      // TODO: implement
    }
  };
}