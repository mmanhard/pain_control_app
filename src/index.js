import React from 'react';
import ReactDOM from 'react-dom';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";

import Navigation from './navigation';
import configureStore from "./store";

const { store, persistor } = configureStore();

const appRoot = document.getElementById('app');
const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Navigation />
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, appRoot);