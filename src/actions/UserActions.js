import API from '../api';
import { genericErrorMsg } from 'Common/AppConst';

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
};

const register = (data, cb = () => {}) => {
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

        cb(true, response.data.message);
      } else {
        dispatch({
          type: userActions.USER_REGISTER_FAIL
        });

        cb(false, response.data.message);
      }
    } catch (err) {
      console.error(err);

      dispatch({
        type: userActions.USER_REGISTER_FAIL
      });

      cb(false, 'Registration failed! Please try again.');
    }
  };
};

const login = (data, cb = () => {}) => {
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

        cb(true, response.data.message);
      } else {
        dispatch({
          type: userActions.USER_LOGIN_FAIL
        });

        cb(false, response.data.message);
      }
    } catch (err) {
      console.error(err);

      dispatch({
        type: userActions.USER_LOGIN_FAIL
      });

      cb(false, 'Login failed! Please try again.');
    }
  };
};

const changePassword = (userInfo, data, cb = () => {}) => {
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

        cb(true, response.data.message);
      } else {
        dispatch({
          type: userActions.USER_PASSWORD_CHANGE_FAIL
        });

        cb(false, response.data.message);
      }
    } catch (err) {
      console.error(err);

      dispatch({
        type: userActions.USER_PASSWORD_CHANGE_FAIL
      });

      cb(false, genericErrorMsg);
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
      console.error(err);

      dispatch({
        type: userActions.GET_USER_FAIL,
      });
    }
  };
}

const updateUser = (userInfo, data, cb = () => {}) => {
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

        cb(true, response.data.message);
      } else {
        dispatch({
          type: userActions.UPDATE_USER_FAIL,
        });

        cb(false, response.data.message);
      }
    } catch (err) {
      console.error(err);

      dispatch({
        type: userActions.UPDATE_USER_FAIL,
      });

      cb(false, genericErrorMsg);
    }
  };
}

export {
  userActions,
  register,
  login,
  changePassword,
  getUserData,
  updateUser
}