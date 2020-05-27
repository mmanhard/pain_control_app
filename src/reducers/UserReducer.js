import actions from '../actions'

const initialState = {
  userInfo: null,
  isLogin: false,
  loginSuccess: false,
  bodyParts: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.userActions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: payload.data.user_info,
        isLogin: true,
        loginSuccess: true
      };
    case actions.userActions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: payload.data.user_info,
        isLogin: true,
        loginSuccess: true
      };
    case actions.userActions.GET_USER_SUCCESS:
      return {
        ...state,
        userInfo: payload.data.user_info,
      };
    case actions.userActions.GET_USER_BODY_PART_SUCCESS:
      return {
        ...state,
        bodyParts: payload.data.body_parts,
      };
    case actions.userActions.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}