import actions from '../actions'

const initialState = {
  bodyPartInfo: null,
  bodyParts: null,
  bodyPartUpdate: false,
  isFetching: false
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

    case actions.bodyPartActions.ADD_BODY_PART_SUCCESS:
      return {
        ...state,
        bodyPartUpdate: true
      };
    case actions.bodyPartActions.EDIT_BODY_PART_SUCCESS:
      return {
        ...state,
        bodyPartUpdate: true
      };
    default:
      return state;
  }
}