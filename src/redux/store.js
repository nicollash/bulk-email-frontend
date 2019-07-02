import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import startupMiddleware from './middlewares/startupMiddleware';
import appReducer from './reducers/appReducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const rootReducer = combineReducers({
  app: appReducer
});

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      startupMiddleware,
      thunk
    )
  )
);

export default store;
