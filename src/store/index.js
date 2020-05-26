import { createStore, combineReducers } from "redux";
import { appReducer } from "../reducers";

export default () => {
  return createStore(appReducer);
};