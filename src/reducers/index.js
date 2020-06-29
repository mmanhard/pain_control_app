import { combineReducers } from "redux";
import UserReducer from "../reducers/UserReducer"
import BodyPartReducer from "../reducers/BodyPartReducer"
import EntryReducer from "../reducers/EntryReducer"

export const appReducer = combineReducers({
  users: UserReducer,
  bodyParts: BodyPartReducer,
  entries: EntryReducer
});