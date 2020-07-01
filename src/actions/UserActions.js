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

  USER_PASSWORD_CHANGE_REQUEST: USER_PREFIX + '_PASSWORD_CHANGE' + '_REQUEST',
  USER_PASSWORD_CHANGE_SUCCESS: USER_PREFIX + '_PASSWORD_CHANGE' + '_SUCCESS',
  USER_PASSWORD_CHANGE_FAIL: USER_PREFIX + '_PASSWORD_CHANGE' + '_FAIL',

  GET_USER_REQUEST: 'GET_' + USER_PREFIX + '_REQUEST',
  GET_USER_SUCCESS: 'GET_' + USER_PREFIX + '_SUCCESS',
  GET_USER_FAIL: 'GET_' + USER_PREFIX + '_FAIL',

  UPDATE_USER_REQUEST: 'UPDATE_' + USER_PREFIX + '_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_' + USER_PREFIX + '_SUCCESS',
  UPDATE_USER_FAIL: 'UPDATE_' + USER_PREFIX + '_FAIL',

  LOG_OUT: 'LOG_OUT',
};

const register = (data) => {
  return async dispatch => {
    dispatch({
      type: userActions.USER_REGISTER_REQUEST
    });
    try {
      const response = await API.register(data);

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
      console.log(err);
    }
  };
};

const login = (data) => {
  return async dispatch => {
    dispatch({
      type: userActions.USER_LOGIN_REQUEST
    });
    try {
      const response = await API.login(data);

      if (response.data.auth_token) {
        localStorage.setItem('token', response.data.auth_token);
        dispatch({
          type: userActions.USER_LOGIN_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: userActions.USER_LOGIN_FAIL
        });
      }
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  };
};

const changePassword = (userInfo, data) => {
  return async dispatch => {
    dispatch({
      type: userActions.USER_PASSWORD_CHANGE_REQUEST
    });
    try {
      const response = await API.changePassword(userInfo, data);

      if (response.data.auth_token) {
        localStorage.setItem('token', response.data.auth_token);
        dispatch({
          type: userActions.USER_PASSWORD_CHANGE_SUCCESS
        });
      } else {
        dispatch({
          type: userActions.USER_PASSWORD_CHANGE_FAIL
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const getUserData = (userInfo, params) => {
  return async dispatch => {
    dispatch({
      type: userActions.GET_USER_REQUEST
    });
    try {
      const response = await API.getUserData(userInfo, params);

      if (!response.fail) {
        dispatch({
          type: userActions.GET_USER_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: userActions.GET_USER_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const updateUser = (userInfo, data) => {
  return async dispatch => {
    dispatch({
      type: userActions.UPDATE_USER_REQUEST
    });
    try {
      const response = await API.updateUser(userInfo, data);

      if (!response.fail) {
        dispatch({
          type: userActions.UPDATE_USER_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: userActions.UPDATE_USER_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export {
  userActions,
  register,
  login,
  logout,
  changePassword,
  getUserData,
  updateUser
}