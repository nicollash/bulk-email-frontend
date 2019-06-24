import {startupDataLoaded, getUserInfo } from '../actions/appActions';
import { LOAD_STARTUP_DATA } from '../actionTypes';

export const startupMiddleware = store => next => action => {
  if (action.type === LOAD_STARTUP_DATA) {
    Promise.all([
      store.dispatch(getUserInfo())
    ])
      .then(() => {
        store.dispatch(startupDataLoaded());
      })
      .catch(err => console.error(err));
  }

  return next(action);
};

export default startupMiddleware;
