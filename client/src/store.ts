import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  Dispatch,
  Action
} from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { IAppState, reducer } from "./reducer";
import { AppActionType } from "./actions";

export type AppMiddleware = Middleware<
  {},
  IAppState,
  Dispatch<Action<AppActionType>>
>;

const isProd = process.env.NODE_ENV === 'production';

const composeEnhancers =
  (window as any)._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// it's needed because we're using class action creators
const actionToPlainObject: AppMiddleware = store => next => action => {
  // checking if action is thunk
  if (typeof action === "function") {
    next(action);
  } else {
    next({ ...action });
  }
};

const middleware = [actionToPlainObject, thunk];
if (!isProd) {
  middleware.push(logger);
}

export const configureStore = () =>
  createStore(
    reducer,
    isProd 
      ? applyMiddleware(...middleware)
      : composeEnhancers(applyMiddleware(...middleware))
  );

export type AppStore = ReturnType<typeof configureStore>;