import {
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_RESET_STATE,
  NEW_PASSWORD_REQUIRED,
  NEW_PASSWORD_PENDING,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAILED,
  AUTH_FORGOT_CODE_SENT,
  AUTH_PASSWORD_CHANGE_SUCCEEDED,
  AUTH_PASSWORD_CHANGE_FAILED,
  AUTH_INIT_PASSWORD_STATE,
  AUTH_CHECK_LIST
} from '../actionTypes'

const initialState = {
  auth: '',
  scale: 0,
  userCred: {},
  userInfo: {},
  forgot: {},
  signInUserSession: {},
  isAuthenticated: false,
  isLoading: false,
  passwordChanged: false,
  passwordChangedFailed: false
}

const actionHandlers = {
  [AUTH_CHECK_LIST]: (state, {type, payload}) => {
    return {
      ...state,
      auth: type
    }
  },
  [AUTH_INIT_PASSWORD_STATE]: (state, {type}) => {
    return {
      ...state,
      auth: type,
      passwordChanged: false,
      passwordChangedFailed: false
    }
  },
  [AUTH_PASSWORD_CHANGE_SUCCEEDED]: (state, {type}) => {
    return {
      ...state,
      auth: type,
      passwordChanged: true
    }
  },
  [AUTH_PASSWORD_CHANGE_FAILED]: (state, {type}) => {
    return {
      ...state,
      auth: type,
      passwordChangedFailed: true
    }
  },
  [AUTH_LOGIN_RESET_STATE]: (state, {type}) => {
    return {
      ...state,
      auth: type,
      isLoading: false
    }
  },
  [NEW_PASSWORD_PENDING]: (state, {type}) => {
    return {
      ...state,
      auth: type,
      isLoading: false
    }
  },
  [NEW_PASSWORD_REQUIRED]: (state, {type, payload}) => {
    return {
      ...state,
      auth: type,
      user: payload,
      isLoading: false
    }
  },
  [NEW_PASSWORD_SUCCESS]: (state, {type}) => {
    return {
      ...state,
      auth: type,
      isLoading: false
    }
  },
  [NEW_PASSWORD_FAILED]: (state, {type}) => {
    return {
      ...state,
      auth: type,
      isLoading: false
    }
  },
  [AUTH_LOGIN_REQUESTED]: (state, {type}) => {
    return {
      ...state,
      auth: type,
      signSMA: false,
      isLoading: true
    }
  },
  [AUTH_LOGIN_SUCCEEDED]: (state, {type, payload}) => {
    return {
      ...state,
      auth: type,
      userProfile: payload,
      isAuthenticated: true,
      isLoading: false
    }
  },
  [AUTH_LOGIN_FAILED]: (state, {type}) => {
    return {
      ...state,
      auth: type,
      isAuthenticated: false,
      isLoading: false
    }
  },
  [AUTH_FORGOT_CODE_SENT]: (state, {type, payload}) => {
    return {
      ...state,
      auth: type,
      forgot: payload
    }
  }
}

export default function (state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}