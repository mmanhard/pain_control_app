import actions from '../actions'

const initialState = {
  entries: null,
  numEntries: 0,
  entryUpdate: false,
  isFetching: false,
  isAwaitingResp: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case actions.entryActions.GET_ALL_ENTRIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actions.entryActions.GET_ALL_ENTRIES_SUCCESS:
      let entries;
      if (!payload.page || payload.page === 0) {
        entries = payload.data.entries;
      } else {
        entries = [ ...state.entries, ...payload.data.entries ]
      }
      return {
        ...state,
        entries: entries,
        numEntries: payload.data.num_entries,
        entryUpdate: false,
        isFetching: false,
      };
    case actions.entryActions.GET_ALL_ENTRIES_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    case actions.entryActions.GET_ENTRY_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actions.entryActions.GET_ENTRY_SUCCESS:
      return {
        ...state,
        entryInfo: payload.data.entry_info,
        entryUpdate: false,
        isFetching: false,
      };
    case actions.entryActions.GET_ENTRY_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    case actions.entryActions.ADD_ENTRY_REQUEST:
      return {
        ...state,
        isAwaitingResp: true
      };
    case actions.entryActions.ADD_ENTRY_SUCCESS:
      return {
        ...state,
        entryUpdate: true,
        isAwaitingResp: false
      };
    case actions.entryActions.ADD_ENTRY_FAIL:
      return {
        ...state,
        isAwaitingResp: false
      };

    case actions.entryActions.DELETE_ENTRY_REQUEST:
      return {
        ...state,
        isAwaitingResp: true
      };
    case actions.entryActions.DELETE_ENTRY_SUCCESS:
      return {
        ...state,
        entryUpdate: true,
        isAwaitingResp: false
      };
    case actions.entryActions.DELETE_ENTRY_FAIL:
      return {
        ...state,
        isAwaitingResp: false
      };

    default:
      return state;
  }
}