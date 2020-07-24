import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';

import actions from '../actions'
import UserReducer from "../reducers/UserReducer"
import BodyPartReducer from "../reducers/BodyPartReducer"
import EntryReducer from "../reducers/EntryReducer"

const appReducer = combineReducers({
  users: UserReducer,
  bodyParts: BodyPartReducer,
  entries: EntryReducer
});

export const rootReducer = (state, action) => {
    if (action.type === actions.logoutAction.LOGOUT) {
        storage.removeItem('persist:root');
        state = undefined;
    }
    
    return appReducer(state, action);
};