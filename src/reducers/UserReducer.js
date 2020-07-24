import actions from '../actions'

const initialState = {
  userInfo: null,
  isLogin: false,
  loginSuccess: false,
  userUpdate: false,
  isFetching: false,
  isAwaitingResp: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case actions.userActions.USER_REGISTER_REQUEST:
      return {
        ...state,
        isAwaitingResp: true,
      };
    case actions.userActions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: payload.data.user_info,
        isLogin: true,
        userUpdate: true,
        loginSuccess: true,
        isAwaitingResp: false,
      };
    case actions.userActions.USER_REGISTER_FAIL:
      return {
        ...state,
        isAwaitingResp: false,
      };

    case actions.userActions.USER_LOGIN_REQUEST:
      return {
        ...state,
        isAwaitingResp: true,
      };
    case actions.userActions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: payload.data.user_info,
        isLogin: true,
        userUpdate: true,
        loginSuccess: true,
        isAwaitingResp: false,
      };
    case actions.userActions.USER_LOGIN_FAIL:
      return {
        ...state,
        isAwaitingResp: false,
      };

    case actions.userActions.GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.userActions.GET_USER_SUCCESS:
      return {
        ...state,
        userUpdate: false,
        userInfo: payload.data.user_info,
        isFetching: false
      };
    case actions.userActions.GET_USER_FAIL:
      return {
        ...state,
        isFetching: false
      };

    case actions.userActions.UPDATE_USER_REQUEST:
      return {
        ...state,
        isAwaitingResp: true,
      };
    case actions.userActions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userUpdate: true,
        isAwaitingResp: false,
      };
    case actions.userActions.UPDATE_USER_REQUEST:
      return {
        ...state,
        isAwaitingResp: false,
      };

    case actions.userActions.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}