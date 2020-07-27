import API from '../api';

const BP_PREFIX = 'BODY_PART';

const bodyPartActions = {
  BP_PREFIX,

  GET_ALL_BODY_PARTS_REQUEST: 'GET_ALL_' + BP_PREFIX + '_REQUEST',
  GET_ALL_BODY_PARTS_SUCCESS: 'GET_ALL_' + BP_PREFIX + '_SUCCESS',
  GET_ALL_BODY_PARTS_FAIL: 'GET_ALL_' + BP_PREFIX + '_FAIL',

  GET_BODY_PART_REQUEST: 'GET_' + BP_PREFIX + '_REQUEST',
  GET_BODY_PART_SUCCESS: 'GET_' + BP_PREFIX + '_SUCCESS',
  GET_BODY_PART_FAIL: 'GET_' + BP_PREFIX + '_FAIL',

  ADD_BODY_PART_REQUEST: 'ADD_' + BP_PREFIX + '_REQUEST',
  ADD_BODY_PART_SUCCESS: 'ADD_' + BP_PREFIX + '_SUCCESS',
  ADD_BODY_PART_FAIL: 'ADD_' + BP_PREFIX + '_FAIL',

  EDIT_BODY_PART_REQUEST: 'EDIT_' + BP_PREFIX + '_REQUEST',
  EDIT_BODY_PART_SUCCESS: 'EDIT_' + BP_PREFIX + '_SUCCESS',
  EDIT_BODY_PART_FAIL: 'EDIT_' + BP_PREFIX + '_FAIL',
};

const getBodyParts = (userInfo, params) => {
  return async dispatch => {
    dispatch({
      type: bodyPartActions.GET_ALL_BODY_PARTS_REQUEST
    });
    try {
      const response = await API.getBodyParts(userInfo, params);

      if (!response.fail) {
        dispatch({
          type: bodyPartActions.GET_ALL_BODY_PARTS_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: bodyPartActions.GET_ALL_BODY_PARTS_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const getBodyPart = (userInfo, bodyPartID, params) => {
  return async dispatch => {
    dispatch({
      type: bodyPartActions.GET_BODY_PART_REQUEST
    });
    try {
      const response = await API.getBodyPart(userInfo, bodyPartID, params);

      if (!response.fail) {
        dispatch({
          type: bodyPartActions.GET_BODY_PART_SUCCESS,
          payload: { data: { ...response.data } }
        });
      } else {
        dispatch({
          type: bodyPartActions.GET_BODY_PART_FAIL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const addBodyPart = (userInfo, data, cb = () => {}) => {
  return async dispatch => {
    dispatch({
      type: bodyPartActions.ADD_BODY_PART_REQUEST
    });
    try {
      const response = await API.addBodyPart(userInfo, data);

      if (!response.fail) {
        dispatch({
          type: bodyPartActions.ADD_BODY_PART_SUCCESS,
          payload: { data: { ...response.data } }
        });

        cb(true, response.data.message);
      } else {
        dispatch({
          type: bodyPartActions.ADD_BODY_PART_FAIL,
        });

        cb(false, response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const editBodyPart = (userInfo, bodyPartID, data, cb = () => {}) => {
  return async dispatch => {
    dispatch({
      type: bodyPartActions.EDIT_BODY_PART_REQUEST
    });
    try {
      const response = await API.editBodyPart(userInfo, bodyPartID, data);

      if (!response.fail) {
        dispatch({
          type: bodyPartActions.EDIT_BODY_PART_SUCCESS,
          payload: { data: { ...response.data } }
        });

        cb(true, response.data.message);
      } else {
        dispatch({
          type: bodyPartActions.EDIT_BODY_PART_FAIL,
        });

        cb(false, response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export {
  bodyPartActions,
  getBodyParts,
  getBodyPart,
  addBodyPart,
  editBodyPart,
}