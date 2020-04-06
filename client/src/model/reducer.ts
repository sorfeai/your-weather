import produce from 'immer';
import { ILocation, IWeatherData, AppError } from './types';
import { 
  LocationAction,
  SET_LOADING,
  SET_ERROR,
  SET_LOCATION,
  SET_WEATHER,
  SELECT_DAY
} from './actions';

export interface IState {
  loading: boolean; 
  error: AppError | null;
  location: ILocation | null;
  weather: IWeatherData[] | null;
  selectedDay: string | null;
}

const initialState: IState = {
  loading: false,
  error: null,
  location: null,
  weather: null,
  selectedDay: null,
};

export function appReducer(state: IState = initialState, action: LocationAction) {
  return produce(state, draft => {
    switch(action.type) {
      case SET_LOADING: 
        draft.loading = action.payload;
        break;
      case SET_ERROR: 
        draft.error = action.payload;
        break;
      case SET_LOCATION: 
        draft.location = action.payload;
        break;
      case SET_WEATHER: 
        draft.weather = action.payload;
        break;
      case SELECT_DAY:
        draft.selectedDay = action.payload;
        break;
    }
  });
}