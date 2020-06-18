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

  UPDATE_USER_REQUEST: 'UPDATE_' + USER_PREFIX + '_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_' + USER_PREFIX + '_SUCCESS',
  UPDATE_USER_FAIL: 'UPDATE_' + USER_PREFIX + '_FAIL',

  GET_USER_BODY_PARTS_REQUEST: 'GET_' + USER_PREFIX + '_BODY_PARTS' + '_REQUEST',
  GET_USER_BODY_PARTS_SUCCESS: 'GET_' + USER_PREFIX + '_BODY_PARTS' + '_SUCCESS',
  GET_USER_BODY_PARTS_FAIL: 'GET_' + USER_PREFIX + '_BODY_PARTS' + '_FAIL',

  GET_USER_BODY_PART_REQUEST: 'GET_' + USER_PREFIX + '_BODY_PART' + '_REQUEST',
  GET_USER_BODY_PART_SUCCESS: 'GET_' + USER_PREFIX + '_BODY_PART' + '_SUCCESS',
  GET_USER_BODY_PART_FAIL: 'GET_' + USER_PREFIX + '_BODY_PART' + '_FAIL',

  ADD_USER_BODY_PART_REQUEST: 'ADD_' + USER_PREFIX + '_BODY_PART' + '_REQUEST',
  ADD_USER_BODY_PART_SUCCESS: 'ADD_' + USER_PREFIX + '_BODY_PART' + '_SUCCESS',
  ADD_USER_BODY_PART_FAIL: 'ADD_' + USER_PREFIX + '_BODY_PART' + '_FAIL',

  GET_USER_ENTRY_REQUEST: 'GET_' + USER_PREFIX + '_ENTRY' + '_REQUEST',
  GET_USER_ENTRY_SUCCESS: 'GET_' + USER_PREFIX + '_ENTRY' + '_SUCCESS',
  GET_USER_ENTRY_FAIL: 'GET_' + USER_PREFIX + '_ENTRY' + '_FAIL',

  ADD_USER_ENTRY_REQUEST: 'ADD_' + USER_PREFIX + '_ENTRY' + '_REQUEST',
  ADD_USER_ENTRY_SUCCESS: 'ADD_' + USER_PREFIX + '_ENTRY' + '_SUCCESS',
  ADD_USER_ENTRY_FAIL: 'ADD_' + USER_PREFIX + '_ENTRY' + '_FAIL',

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

const getBodyParts = (userInfo, params) => {
  return async dispatch => {
    dispatch({
      type: userActions.GET_USER_BODY_PARTS_REQUEST
    });
    try {
      const response = await API.getBodyParts(userInfo, params);

      if (!response.fail) {
        dispatch({
          type: userActions.GET_USER_BODY_PARTS_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: userActions.GET_USER_BODY_PARTS_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const getBodyPart = (userInfo, params) => {
  return async dispatch => {
    dispatch({
      type: userActions.GET_USER_BODY_PART_REQUEST
    });
    try {
      const response = await API.getBodyPart(userInfo, params);

      if (!response.fail) {
        dispatch({
          type: userActions.GET_USER_BODY_PART_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: userActions.GET_USER_BODY_PART_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const addBodyPart = (userInfo, data) => {
  return async dispatch => {
    dispatch({
      type: userActions.ADD_USER_BODY_PART_REQUEST
    });
    try {
      const response = await API.addBodyPart(userInfo, data);

      if (!response.fail) {
        dispatch({
          type: userActions.ADD_USER_BODY_PART_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: userActions.ADD_USER_BODY_PART_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const getEntries = (userInfo, params) => {
  return async dispatch => {
    dispatch({
      type: userActions.GET_USER_ENTRY_REQUEST
    });
    try {
      const response = await API.getEntries(userInfo, params);

      if (!response.fail) {
        dispatch({
          type: userActions.GET_USER_ENTRY_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: userActions.GET_USER_ENTRY_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const addEntry = (userInfo, data) => {
  return async dispatch => {
    dispatch({
      type: userActions.ADD_USER_ENTRY_REQUEST
    });
    try {
      const response = await API.addEntry(userInfo, data);

      if (!response.fail) {
        dispatch({
          type: userActions.ADD_USER_ENTRY_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: userActions.ADD_USER_ENTRY_FAIL,
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
  getUserData,
  updateUser,
  getBodyParts,
  getBodyPart,
  addBodyPart,
  getEntries,
  addEntry
}