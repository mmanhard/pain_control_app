import React from 'react';
import ReactDOM from 'react-dom';
import "core-js/stable";
import "regenerator-runtime/runtime";

import Navigation from './navigation';
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

const appRoot = document.getElementById('app');
const app = (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

ReactDOM.render(app, appRoot);