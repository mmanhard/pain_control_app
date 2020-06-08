import React from 'react';
import ReactDOM from 'react-dom';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import WebFont from 'webfontloader';

import Navigation from './navigation';
import configureStore from "./store";

const { store, persistor } = configureStore();

WebFont.load({
   google: {
     families: ['Raleway:ital,wght@0,200;0,400;0,900;1,700', 'sans-serif']
   }
});

const appRoot = document.getElementById('app');
const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Navigation />
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, appRoot);