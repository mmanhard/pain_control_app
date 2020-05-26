import { combineReducers } from "redux";
import UserReducer from "../reducers/UserReducer"

export const appReducer = combineReducers({
  users: UserReducer,
});