
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './authReducer'

const persistConfig = {
  key: 'root',
  storage,
}

export default function createReducer(history) {
  return combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    router: connectRouter(history),
    toastr: toastrReducer,
  });
}