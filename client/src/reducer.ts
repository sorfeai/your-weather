import { combineReducers } from "redux";
import { IState, appReducer } from "./model/reducer";

export type IAppState = IState;

export const reducer = appReducer;
