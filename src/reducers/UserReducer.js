import actions from '../actions'

const initialState = {
  userInfo: null,
  isLogin: false,
  loginSuccess: false,
  userUpdate: false,
  bodyParts: null,
  bodyPartUpdate: false,
  entries: null,
  entryUpdate: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.userActions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: payload.data.user_info,
        isLogin: true,
        userUpdate: true,
        loginSuccess: true
      };
    case actions.userActions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: payload.data.user_info,
        isLogin: true,
        userUpdate: true,
        loginSuccess: true
      };
    case actions.userActions.GET_USER_SUCCESS:
      return {
        ...state,
        userUpdate: false,
        userInfo: payload.data.user_info,
      };
    case actions.userActions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userUpdate: true,
      };
    case actions.userActions.GET_USER_BODY_PART_SUCCESS:
      return {
        ...state,
        bodyParts: payload.data.body_parts,
        bodyPartUpdate: false
      };
    case actions.userActions.ADD_USER_BODY_PART_SUCCESS:
      return {
        ...state,
        bodyPartUpdate: true
      };
    case actions.userActions.GET_USER_ENTRY_SUCCESS:
      return {
        ...state,
        entries: payload.data.entries,
        entryUpdate: false
      };
    case actions.userActions.ADD_USER_ENTRY_SUCCESS:
      return {
        ...state,
        entryUpdate: true
      };
    case actions.userActions.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}