import {
  AUTH_LOGIN_INITIAL_STATE,
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_RESET_STATE,
  NEW_PASSWORD_REQUIRED,
  AUTH_USER_CREDENTIAL_SET,
  AUTH_SIGNUP_REQUESTED,
  AUTH_SIGNUP_SUCCEEDED,
  AUTH_SIGNUP_FAILED,
  AUTH_SIGNUP_RESET_STATE,
  AUTH_EMAIL_VERIFICATION_REQUESTED,
  AUTH_EMAIL_VERIFICATION_SUCCEEDED,
  AUTH_EMAIL_VERIFICATION_FAILED,
  AUTH_EMAIL_VERIFICATION_RESET_STATE,
  AUTH_SET_USER_FROM_STORAGE,
  AUTH_FORGOT_CODE_SENT,
  AUTH_PASSWORD_CHANGE_SUCCEEDED,
  AUTH_PASSWORD_CHANGE_FAILED,
  AUTH_LOGIN_STORE,
  SET_USER_REQUESTED,
  SET_USER_SUCCEEDED,
  SET_USER_FAILED,
  AUTH_INIT_PASSWORD_STATE,
  AUTH_CHECK_LIST
} from '../actions/authActions'

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
    case NEW_PASSWORD_REQUIRED:
      return {
        ...state,
        auth: type,
        newPasswordChallenge: payload,
        isLoading: false
      }
    case AUTH_SET_USER_FROM_STORAGE:
      return {
        ...state,
        auth: type,
        ...payload
      }

    case AUTH_LOGIN_STORE:
      return {
        ...state,
        cred: payload
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

    case AUTH_SIGNUP_REQUESTED:
      return {
        ...state,
        auth: type,
        userInfo: payload,
        isEmailVerified: false,
        isLoading: true
      }

    case AUTH_SIGNUP_SUCCEEDED:
      return {
        ...state,
        auth: type,
        isLoading: false
      }

    case AUTH_SIGNUP_FAILED:
      return {
        ...state,
        auth: type,
        error: payload,
        isLoading: false
      }

    case AUTH_SIGNUP_RESET_STATE:
      return {
        ...state,
        auth: type
      }

    case AUTH_USER_CREDENTIAL_SET:
      return {
        ...state,
        auth: type,
        userCred: payload
      }
    case AUTH_EMAIL_VERIFICATION_REQUESTED:
      return {
        ...state,
        auth: type,
        isLoading: true
      }
    case AUTH_EMAIL_VERIFICATION_SUCCEEDED:
      return {
        ...state,
        auth: type,
        signInUserSession: payload,
        isEmailVerified: true,
        isLoading: false
      }
    case AUTH_EMAIL_VERIFICATION_FAILED:
      return {
        ...state,
        auth: type,
        isEmailVerified: false,
        isLoading: false
      }
    case AUTH_EMAIL_VERIFICATION_RESET_STATE:
      return {
        ...state,
        auth: type
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
