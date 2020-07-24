import * as UserActions from './UserActions';
import * as BodyPartActions from './BodyPartActions';
import * as EntryActions from './EntryActions';
import API from '../api';

const logoutAction = {
  LOGOUT: 'LOGOUT'
}

const logout = () => {
  return async dispatch => {
    try {
      const response = await API.logout();

      dispatch({
        type: logoutAction.LOGOUT
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export default {
  ...UserActions,
  ...BodyPartActions,
  ...EntryActions,
  logoutAction,
  logout,
};
