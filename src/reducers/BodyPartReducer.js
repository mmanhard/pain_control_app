import actions from '../actions'

const initialState = {
  bodyPartInfo: null,
  bodyParts: null,
  bodyPartUpdate: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.bodyPartActions.GET_ALL_BODY_PARTS_SUCCESS:
      return {
        ...state,
        bodyParts: payload.data.body_parts,
        bodyPartUpdate: false
      };
    case actions.bodyPartActions.GET_BODY_PART_SUCCESS:
      return {
        ...state,
        bodyPartInfo: payload.data.body_part_info,
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