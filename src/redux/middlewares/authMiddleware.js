import { LOAD_STARTUP_DATA } from '../actionTypes'
import { AUTH_LOGIN_SUCCEEDED, refreshWithToken } from '../actions/authActions'
import { getUser } from '../actions/userActions'
export const authMiddleware = store => next => action => {
  if ((store.getState().auth.isAuthenticated && action.type === LOAD_STARTUP_DATA) || action.type === AUTH_LOGIN_SUCCEEDED) {
    Promise.all([
      store.dispatch(refreshWithToken())
    ])
      .then(() => {
        // store.dispatch(getUser())
      })
  }

  return next(action)
}

export default authMiddleware
