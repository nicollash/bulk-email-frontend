import { LOAD_STARTUP_DATA, AUTH_LOGIN_SUCCEEDED } from '../actionTypes'
import { refreshWithToken } from '../actions/authActions'
// import { getUser } from '../actions/userActions'
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
