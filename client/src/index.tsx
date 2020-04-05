import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { App } from "./components/app";

import 'normalize.css';
import './styles/index.css';

const store = configureStore();
const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);