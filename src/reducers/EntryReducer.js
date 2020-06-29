import actions from '../actions'

const initialState = {
  entries: null,
  entryUpdate: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.entryActions.GET_ALL_ENTRIES_SUCCESS:
      return {
        ...state,
        entries: payload.data.entries,
        entryUpdate: false
      };
    case actions.entryActions.ADD_ENTRY_SUCCESS:
      return {
        ...state,
        entryUpdate: true
      };
    default:
      return state;
  }
}