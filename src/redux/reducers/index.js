
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from './appReducer';

export default function createReducer(history) {
  return combineReducers({
    app: appReducer,
    router: connectRouter(history)
  });
}