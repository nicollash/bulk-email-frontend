import { GET_USER_INFO, LOAD_STARTUP_DATA } from "../actionTypes";

const initialState = {
  userName: 'Test User',
};

const actionHandlers = {
  [GET_USER_INFO] : (state, action) => {
    return state
  }
};

export default function appReducer(state = initialState, action ) {
    return actionHandlers[action.type] ? actionHandlers[action.type](state, action) : state;
}
