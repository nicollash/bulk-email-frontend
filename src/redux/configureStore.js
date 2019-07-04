import { createStore, compose, applyMiddleware } from 'redux';

// middlewares
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import startupMiddleware from './middlewares/startupMiddleware';
import authMiddleware from './middlewares/authMiddleware';

import createRootReducer from './reducers';

const loggerMiddleware = createLogger();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = (history, initialState = {}) => {
  const middlewares = [
    routerMiddleware(history),
    loggerMiddleware,
    thunk,
    startupMiddleware,
    authMiddleware,
  ];

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}

export default configureStore;
