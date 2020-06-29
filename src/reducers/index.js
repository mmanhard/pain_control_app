import { combineReducers } from "redux";
import UserReducer from "../reducers/UserReducer"
import BodyPartReducer from "../reducers/BodyPartReducer"

export const appReducer = combineReducers({
  users: UserReducer,
  bodyParts: BodyPartReducer
});