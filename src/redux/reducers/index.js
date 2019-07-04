
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr'

import appReducer from './appReducer';
import authReducer from './authReducer'

export default function createReducer(history) {
  return combineReducers({
    app: appReducer,
    auth: authReducer,
    router: connectRouter(history),
    toastr: toastrReducer,
  });
}