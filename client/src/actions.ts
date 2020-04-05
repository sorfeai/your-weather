import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "./reducer";
import { LocationActionType, LocationAction } from "./model/actions";

export type AppActionType = LocationActionType;

export type AppAction = LocationAction;

export type AppDispatch = ThunkDispatch<IAppState, {}, AppAction>;