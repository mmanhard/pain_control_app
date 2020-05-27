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

  GET_USER_REQUEST: 'GET_' + USER_PREFIX + '_REQUEST',
  GET_USER_SUCCESS: 'GET_' + USER_PREFIX + '_SUCCESS',
  GET_USER_FAIL: 'GET_' + USER_PREFIX + '_FAIL',

  GET_USER_BODY_PART_REQUEST: 'GET_' + USER_PREFIX + '_BODY_PART' + '_REQUEST',
  GET_USER_BODY_PART_SUCCESS: 'GET_' + USER_PREFIX + '_BODY_PART' + '_SUCCESS',
  GET_USER_BODY_PART_FAIL: 'GET_' + USER_PREFIX + '_BODY_PART' + '_FAIL',

  ADD_USER_BODY_PART_REQUEST: 'ADD_' + USER_PREFIX + '_BODY_PART' + '_REQUEST',
  ADD_USER_BODY_PART_SUCCESS: 'ADD_' + USER_PREFIX + '_BODY_PART' + '_SUCCESS',
  ADD_USER_BODY_PART_FAIL: 'ADD_' + USER_PREFIX + '_BODY_PART' + '_FAIL',

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
      console.log(err)
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

const getUserData = (params) => {
  return async dispatch => {
    dispatch({
      type: userActions.GET_USER_REQUEST
    });
    try {
      const response = await API.getUserData(params);

      dispatch({
        type: userActions.GET_USER_SUCCESS,
        payload: { data: { ...response.data } }
      });
    } catch (err) {
      console.log(err)
    }
  };
}

const getBodyParts = (params) => {
  return async dispatch => {
    dispatch({
      type: userActions.GET_USER_BODY_PART_REQUEST
    });
    try {
      const response = await API.getBodyParts(params);
      dispatch({
        type: userActions.GET_USER_BODY_PART_SUCCESS,
        payload: { data: { ...response.data } }
      });
    } catch (err) {
      console.log('Hello');
    }
  };
}

const addBodyPart = (data) => {
  return async dispatch => {
    dispatch({
      type: userActions.ADD_USER_BODY_PART_REQUEST
    });
    try {
      const response = await API.addBodyPart(data);

      dispatch({
        type: userActions.ADD_USER_BODY_PART_SUCCESS,
        payload: { data: { ...response.data } }
      });
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
  getUserData,
  getBodyParts,
  addBodyPart
}