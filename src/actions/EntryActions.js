import API from '../api';

const ENTRY_PREFIX = 'ENTRY';

const entryActions = {
  ENTRY_PREFIX,

  GET_ALL_ENTRIES_REQUEST: 'GET_ALL_' + ENTRY_PREFIX + '_REQUEST',
  GET_ALL_ENTRIES_SUCCESS: 'GET_ALL_' + ENTRY_PREFIX + '_SUCCESS',
  GET_ALL_ENTRIES_FAIL: 'GET_ALL_' + ENTRY_PREFIX + '_FAIL',

  ADD_ENTRY_REQUEST: 'ADD_' + ENTRY_PREFIX + '_REQUEST',
  ADD_ENTRY_SUCCESS: 'ADD_' + ENTRY_PREFIX + '_SUCCESS',
  ADD_ENTRY_FAIL: 'ADD_' + ENTRY_PREFIX + '_FAIL',
};

const getEntries = (userInfo, params) => {
  return async dispatch => {
    dispatch({
      type: entryActions.GET_ALL_ENTRIES_REQUEST
    });
    try {
      const response = await API.getEntries(userInfo, params);

      if (!response.fail) {
        dispatch({
          type: entryActions.GET_ALL_ENTRIES_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: entryActions.GET_ALL_ENTRIES_FAIL,
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
      type: entryActions.ADD_ENTRY_REQUEST
    });
    try {
      const response = await API.addEntry(userInfo, data);

      if (!response.fail) {
        dispatch({
          type: entryActions.ADD_ENTRY_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: entryActions.ADD_ENTRY_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export {
  entryActions,
  getEntries,
  addEntry
}