import API from '../api';

const ENTRY_PREFIX = 'ENTRY';

const entryActions = {
  ENTRY_PREFIX,

  GET_ALL_ENTRIES_REQUEST: 'GET_ALL_' + ENTRY_PREFIX + '_REQUEST',
  GET_ALL_ENTRIES_SUCCESS: 'GET_ALL_' + ENTRY_PREFIX + '_SUCCESS',
  GET_ALL_ENTRIES_FAIL: 'GET_ALL_' + ENTRY_PREFIX + '_FAIL',

  GET_ENTRY_REQUEST: 'GET_' + ENTRY_PREFIX + '_REQUEST',
  GET_ENTRY_SUCCESS: 'GET_' + ENTRY_PREFIX + '_SUCCESS',
  GET_ENTRY_FAIL: 'GET_' + ENTRY_PREFIX + '_FAIL',

  ADD_ENTRY_REQUEST: 'ADD_' + ENTRY_PREFIX + '_REQUEST',
  ADD_ENTRY_SUCCESS: 'ADD_' + ENTRY_PREFIX + '_SUCCESS',
  ADD_ENTRY_FAIL: 'ADD_' + ENTRY_PREFIX + '_FAIL',

  DELETE_ENTRY_REQUEST: 'ADD_' + ENTRY_PREFIX + '_REQUEST',
  DELETE_ENTRY_SUCCESS: 'ADD_' + ENTRY_PREFIX + '_SUCCESS',
  DELETE_ENTRY_FAIL: 'ADD_' + ENTRY_PREFIX + '_FAIL',
};

const getEntries = (userInfo, params, cb = () => {}) => {
  return async dispatch => {
    dispatch({
      type: entryActions.GET_ALL_ENTRIES_REQUEST
    });
    try {
      const response = await API.getEntries(userInfo, params);

      if (!response.fail) {
        dispatch({
          type: entryActions.GET_ALL_ENTRIES_SUCCESS,
          payload: { page: params?.page, data: { ...response.data } }
        });

        cb(true, response.data.message);
      } else {
        dispatch({
          type: entryActions.GET_ALL_ENTRIES_FAIL,
        });

        cb(false, response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const getEntry = (userInfo, entryID, params) => {
  return async dispatch => {
    dispatch({
      type: entryActions.GET_ENTRY_REQUEST,
    });
    try {
      const response = await API.getEntry(userInfo, entryID, params);

      if (!response.fail) {
        dispatch({
          type: entryActions.GET_ENTRY_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: entryActions.GET_ENTRY_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const addEntry = (userInfo, data, cb = () => {}) => {
  return async dispatch => {
    dispatch({
      type: entryActions.ADD_ENTRY_REQUEST
    });
    try {
      const response = await API.addEntry(userInfo, data);

      if (!response.fail) {
        dispatch({
          type: entryActions.ADD_ENTRY_SUCCESS,
          payload: { data: { ...response.data } }
        });

        cb(true, response.data.message);
      } else {
        dispatch({
          type: entryActions.ADD_ENTRY_FAIL,
        });

        cb(false, response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const deleteEntry = (userInfo, entryID, cb = () => {}) => {
  return async dispatch => {
    dispatch({
      type: entryActions.DELETE_ENTRY_REQUEST
    });
    try {
      const response = await API.deleteEntry(userInfo, entryID);
      if (!response.fail) {
        dispatch({
          type: entryActions.DELETE_ENTRY_SUCCESS,
        });

        cb(true, response.data.message);
      } else {
        dispatch({
          type: entryActions.DELETE_ENTRY_FAIL,
        });

        cb(false, response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

}

export {
  entryActions,
  getEntries,
  getEntry,
  addEntry,
  deleteEntry
}