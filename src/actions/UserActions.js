import API from '../api';

const USER_PREFIX = 'USER';

const userActions = {
  USER_PREFIX,

  USER_REGISTER_REQUEST: USER_PREFIX + '_REGISTER' + '_REQUEST',
  USER_REGISTER_SUCCESS: USER_PREFIX + '_REGISTER' + '_SUCCESS',
  USER_REGISTER_FAIL: USER_PREFIX + '_REGISTER' + '_FAIL',

  USER_LOGIN_REQUEST: USER_PREFIX + '_LOGIN' + '_REQUEST',
  USER_LOGIN_SUCCESS: USER_PREFIX + '_LOGIN' + '_SUCCESS',
  USER_LOGIN_FAIL: USER_PREFIX + '_LOGIN' + '_FAIL',

  LOG_OUT: 'LOG_OUT',
};

const register = (params) => {
  return async dispatch => {
    dispatch({
      type: userActions.USER_REGISTER_REQUEST
    });
    try {
      const response = await API.register(params);

      if (response.data.auth_token) {
        localStorage.setItem('token', response.data.auth_token);
        dispatch({
          type: userActions.USER_REGISTER_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: userActions.USER_REGISTER_FAIL
        });
      }
    } catch (err) {
      console.log(err)
    }
  };
};

const logout = () => {
  return async dispatch => {
    try {
      const response = await API.logout();

      dispatch({
        type: userActions.LOG_OUT
      });
    } catch (err) {
      console.log(err)
    }
  };
};

export {
  userActions,
  register,
  logout
}