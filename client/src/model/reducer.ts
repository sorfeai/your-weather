import produce from 'immer';
import { ILocation, IWeatherData } from './types';
import { 
  LocationAction,
  SET_REQUEST_STATUS,
  SET_LOCATION,
  SET_WEATHER,
  SELECT_DAY
} from './actions';
import { RequestStatus } from '../types';

export interface IState {
  requestStatus: RequestStatus | null; // null means not requested yet
  location: ILocation | null;
  weather: IWeatherData[] | null;
  selectedDay: string | null;
}

const initialState: IState = {
  requestStatus: null,
  location: null,
  weather: null,
  selectedDay: null,
};

export function appReducer(state: IState = initialState, action: LocationAction) {
  return produce(state, draft => {
    switch(action.type) {
      case SET_REQUEST_STATUS: 
        draft.requestStatus = action.payload;
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