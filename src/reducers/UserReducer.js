import actions from '../actions'

const initialState = {
  userInfo: null,
  token: null,
  isLogin: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.userActions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: payload.data.user_info,
        token: payload.data.auth_token,
        isLogin: true
      };
    case actions.userActions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: payload.data.user_info,
        token: payload.data.auth_token,
        isLogin: true
      };
    case actions.userActions.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}