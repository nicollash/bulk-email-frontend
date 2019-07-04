import {
  AUTH_LOGIN_INITIAL_STATE,
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_RESET_STATE,
  NEW_PASSWORD_REQUIRED,
  NEW_PASSWORD_PENDING,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAILD,
  AUTH_FORGOT_CODE_SENT,
  AUTH_PASSWORD_CHANGE_SUCCEEDED,
  AUTH_PASSWORD_CHANGE_FAILED,
  SET_USER_REQUESTED,
  SET_USER_SUCCEEDED,
  SET_USER_FAILED,
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
  isEmailVerified: false,
  isLoading: false,
  passwordChanged: false,
  passwordChangedFailed: false
}

export default function (state = initialState, { type, payload }) {
  switch (type) {

    case AUTH_CHECK_LIST:
      return {
        ...state,
        auth: type
      }

    case AUTH_LOGIN_INITIAL_STATE:
      return {
        ...state,
        auth: type,
        isLoading: false,
        isEmailVerified: (payload.email_verified === 'true'),
        isPhoneVerified: (payload.phone_number_verified === 'true'),
        userInfo: {
          phoneNumber: payload.phone_number,
          companyPhoneNumber: payload.phone_number
        }
      }

    case AUTH_INIT_PASSWORD_STATE:
      return {
        ...state,
        auth: type,
        passwordChanged: false,
        passwordChangedFailed: false
      }

    case AUTH_PASSWORD_CHANGE_SUCCEEDED:
      return {
        ...state,
        auth: type,
        passwordChanged: true
      }

    case AUTH_PASSWORD_CHANGE_FAILED:
      return {
        ...state,
        auth: type,
        passwordChangedFailed: true
      }

    case AUTH_LOGIN_RESET_STATE:
      return {
        ...state,
        auth: type,
        isLoading: false
      }

    case NEW_PASSWORD_PENDING:
      return {
        ...state,
        auth: type,
        isLoading: false
      }

    case NEW_PASSWORD_REQUIRED:
      return {
        ...state,
        auth: type,
        newPasswordChallenge: payload,
        isLoading: false
      }
      
    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        auth: type,
        isLoading: false
      }

    case NEW_PASSWORD_FAILD:
      return {
        ...state,
        auth: type,
        isLoading: false
      }

    case AUTH_LOGIN_REQUESTED:
      return {
        ...state,
        auth: type,
        isEmailVerified: false,
        isPhoneVerified: false,
        signSMA: false,
        isLoading: true
      }

    case AUTH_LOGIN_SUCCEEDED:
      return {
        ...state,
        auth: type,
        userProfile: payload,
        isAuthenticated: true,
        isLoading: false
      }

    case AUTH_LOGIN_FAILED:
      return {
        ...state,
        auth: type,
        isAuthenticated: false,
        isLoading: false
      }

    case AUTH_FORGOT_CODE_SENT:
      return {
        ...state,
        auth: type,
        forgot: payload
      }

    case SET_USER_REQUESTED:
      return {
        ...state,
        isLoading: true
      }

    case SET_USER_SUCCEEDED:
      return {
        ...state,
        auth: type,
        userProfile: payload,
        userInfo: {
          phoneNumber: payload.phone_number,
          companyPhoneNumber: payload.phone_number
        },
        isLoading: false
      }

    case SET_USER_FAILED:
      return {
        ...state,
        auth: type,
        isLoading: false
      }
      
    default:
      return state
  }
}
