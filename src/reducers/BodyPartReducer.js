import actions from '../actions'

const initialState = {
  bodyPartInfo: null,
  bodyParts: null,
  bodyPartUpdate: false,
  isFetching: false,
  isAwaitingResp: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.bodyPartActions.GET_ALL_BODY_PARTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case actions.bodyPartActions.GET_ALL_BODY_PARTS_SUCCESS:
      return {
        ...state,
        bodyParts: payload.data.body_parts,
        bodyPartUpdate: false,
        isFetching: false,
      };
    case actions.bodyPartActions.GET_ALL_BODY_PARTS_FAIL:
      return {
        ...state,
        isFetching: false,
      }

    case actions.bodyPartActions.GET_BODY_PART_SUCCESS:
      return {
        ...state,
        isFetching: true,
      };
    case actions.bodyPartActions.GET_BODY_PART_SUCCESS:
      return {
        ...state,
        bodyPartInfo: payload.data.body_part_info,
        isFetching: false,
      };
    case actions.bodyPartActions.GET_BODY_PART_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    case actions.bodyPartActions.ADD_BODY_PART_REQUEST:
      return {
        ...state,
        isAwaitingResp: true,
      };
    case actions.bodyPartActions.ADD_BODY_PART_SUCCESS:
      return {
        ...state,
        isAwaitingResp: false,
        bodyPartUpdate: true
      };
    case actions.bodyPartActions.ADD_BODY_PART_FAIL:
      return {
        ...state,
        isAwaitingResp: false,
      };

    case actions.bodyPartActions.EDIT_BODY_PART_REQUEST:
      return {
        ...state,
        isAwaitingResp: true,
      };
    case actions.bodyPartActions.EDIT_BODY_PART_SUCCESS:
      return {
        ...state,
        bodyPartUpdate: true,
        isAwaitingResp: false,
      };
    case actions.bodyPartActions.EDIT_BODY_PART_FAIL:
      return {
        ...state,
        isAwaitingResp: false,
      };

    default:
      return state;
  }
}