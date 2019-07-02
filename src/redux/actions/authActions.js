import {
  signUpUser,
  signInUser,
  createPassword,
  verifyUserAccount,
  forgotPassword,
  changePasswordWithCode,
  refreshToken,
  updateUserInfo
} from '../../services/aws/aws_cognito'
// import { getUser } from '../actions/userActions'

export const AUTH_LOGIN_INITIAL_STATE = 'AUTH_LOGIN_INITIAL_STATE'
export const AUTH_LOGIN_REQUESTED = 'AUTH_LOGIN_REQUESTED'
export const AUTH_LOGIN_SUCCEEDED = 'AUTH_LOGIN_SUCCEEDED'
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED'
export const AUTH_LOGIN_RESET_STATE = 'AUTH_LOGIN_RESET_STATE'
export const NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED'
export const AUTH_USER_CREDENTIAL_SET = 'AUTH_USER_CREDENTIAL_SET'
export const AUTH_SIGNUP_REQUESTED = 'AUTH_SIGNUP_REQUESTED'
export const AUTH_SIGNUP_SUCCEEDED = 'AUTH_SIGNUP_SUCCEEDED'
export const AUTH_SIGNUP_FAILED = 'AUTH_SIGNUP_FAILED'
export const AUTH_SIGNUP_RESET_STATE = 'AUTH_SIGNUP_RESET_STATE'
export const AUTH_EMAIL_VERIFICATION_REQUESTED = 'AUTH_EMAIL_VERIFICATION_REQUESTED'
export const AUTH_EMAIL_VERIFICATION_SUCCEEDED = 'AUTH_EMAIL_VERIFICATION_SUCCEEDED'
export const AUTH_EMAIL_VERIFICATION_FAILED = 'AUTH_EMAIL_VERIFICATION_FAILED'
export const AUTH_EMAIL_VERIFICATION_RESET_STATE = 'AUTH_EMAIL_VERIFICATION_RESET_STATE'
export const AUTH_SET_USER_FROM_STORAGE = 'AUTH_SET_USER_FROM_STORAGE'
export const AUTH_FORGOT_CODE_SENT = 'AUTH_FORGOT_CODE_SENT'
export const AUTH_PASSWORD_CHANGE_SUCCEEDED = 'AUTH_PASSWORD_CHANGE_SUCCEEDED'
export const AUTH_PASSWORD_CHANGE_FAILED = 'AUTH_PASSWORD_CHANGE_FAILED'
export const AUTH_USER_SIGNED_OUT = 'AUTH_USER_SIGNED_OUT'
export const AUTH_LOGIN_STORE = 'AUTH_LOGIN_STORE'
export const SET_USER_REQUESTED = 'SET_USER_REQUESTED'
export const SET_USER_SUCCEEDED = 'SET_USER_SUCCEEDED'
export const SET_USER_FAILED = 'SET_USER_FAILED'
export const AUTH_INIT_PASSWORD_STATE = 'AUTH_INIT_PASSWORD_STATE'
export const AUTH_CHECK_LIST = 'AUTH_CHECK_LIST'

export const updateUser = (editedInfo) => async (dispatch, getState) => {
  dispatch(updateRequested())
  const res = await updateUserInfo('keith@chatmantics.com', editedInfo)
  if (res) {
    dispatch(updateSucceeded(res))
  } else {
    dispatch(updateFailed())
  }
}

export const updateRequested = () => ({
  type: SET_USER_REQUESTED
})

export const updateSucceeded = (payload) => ({
  type: SET_USER_SUCCEEDED,
  payload
})

export const updateFailed = () => ({
  type: SET_USER_FAILED
})

export const changePassword = (payload) => async (dispatch, getState) => {
  const { cognitoUser } = getState().auth.forgot

  const res = await changePasswordWithCode(cognitoUser, payload)

  if (res.code === 'SUCCEEDED') {
    dispatch(passwordChangeSucceeded())
  } else {
    dispatch(passwordChangeFailed())
  }
}

export const passwordChangeSucceeded = payload => ({
  type: AUTH_PASSWORD_CHANGE_SUCCEEDED,
  payload
})

export const passwordChangeFailed = payload => ({
  type: AUTH_PASSWORD_CHANGE_FAILED,
  payload
})

export const initAuthPwdState = payload => ({
  type: AUTH_INIT_PASSWORD_STATE,
  payload
})

export const sendEmail = (email) => async (dispatch, getState) => {
  const res = await forgotPassword(email)

  if (res.code === 'SUCCESS') {
    dispatch(forgotCodeSent(res))
  } else {
  }
}

export const forgotCodeSent = payload => ({
  type: AUTH_FORGOT_CODE_SENT,
  payload
})

export const setUserFromLocalStorage = payload => ({
  type: AUTH_SET_USER_FROM_STORAGE,
  payload
})

export const SetAuthStateCheckList = () => ({
  type: AUTH_CHECK_LIST
})

export const login = values => async (dispatch, getState) => {
  dispatch(loginRequested())
  const userProfile = await signInUser(values.username, values.password)

  if (userProfile.email) {
    if (userProfile.email_verified === 'true' && userProfile.phone_number_verified === 'true') {
      dispatch(loginSucceeded(userProfile))
    } else {
      dispatch(loginInitialState(userProfile))
    }
  } else {
    if (userProfile.challengeName === 'NEW_PASSWORD_REQUIRED') {
      dispatch(resetNewPassword(userProfile))
    } else if (userProfile.code === 'UserNotConfirmedException') {
      dispatch(loginInitialState(userProfile))
    } else {
      dispatch(loginFailed(userProfile))
      setTimeout(function () {
        dispatch(loginResetState())
      }, 500)
    }
  }
}

export const createNewPassword = values => async (dispatch, getState) => {
  const userProfile = await createPassword(values.newPasswordChallenge, values.password)
}

export const storeLogin = (payload) => ({
  type: AUTH_LOGIN_STORE,
  payload
})

export const loginInitialState = (payload) => ({
  type: AUTH_LOGIN_INITIAL_STATE,
  payload
})

export const loginResetState = () => ({
  type: AUTH_LOGIN_RESET_STATE
})

export const resetNewPassword = (payload) => ({
  type: NEW_PASSWORD_REQUIRED,
  payload
})

export const loginRequested = () => ({
  type: AUTH_LOGIN_REQUESTED
})

export const loginSucceeded = payload => ({
  type: AUTH_LOGIN_SUCCEEDED,
  payload
})

export const loginFailed = payload => ({
  type: AUTH_LOGIN_FAILED,
  payload
})

export const refreshWithToken = () => async (dispatch, getState) => {
  const { auth } = getState().auth

  if (auth === 'AUTH_LOGIN_SUCCEEDED') {
    await refreshToken()
  }
}

export const setUserCredential = payload => (dispatch, getState) => {
  dispatch(userCredentialSet(payload))
}

export const userCredentialSet = payload => ({
  type: AUTH_USER_CREDENTIAL_SET,
  payload
})

export const signupUser = (userInfo) => async (dispatch, getState) => {
  const { auth } = getState()

  dispatch(signupRequested(userInfo))

  const userProfile = await signUpUser(
    auth.userCred.userName,
    auth.userCred.email,
    auth.userCred.password,
    userInfo.givenName,
    userInfo.familyName
  )

  if (userProfile.code) {
    dispatch(signupFailed(userProfile))
    setTimeout(function () {
      dispatch(signupResetState())
    }, 500)
  } else {
    dispatch(signupSucceeded(userProfile))
  }
}

export const signupRequested = payload => ({
  type: AUTH_SIGNUP_REQUESTED,
  payload
})

export const signupSucceeded = payload => ({
  type: AUTH_SIGNUP_SUCCEEDED,
  payload
})

export const signupFailed = payload => ({
  type: AUTH_SIGNUP_FAILED,
  payload
})

export const signupResetState = payload => ({
  type: AUTH_SIGNUP_RESET_STATE,
  payload
})

export const verifyEmail = (pin) => async (dispatch, getState) => {
  dispatch(emailVerificationRequested())
  const { userCred } = getState().auth
  const res = await verifyUserAccount(userCred.userName, pin)

  if (res === 'SUCCESS') {
    const user = await signInUser(userCred.userName, userCred.password)
    dispatch(emailVerificationSucceeded(user.signInUserSession))
  } else {
    dispatch(emailVerificationFailed(res))
    setTimeout(function () {
      dispatch(emailVerificationResetState())
    }, 500)
  }
}

export const emailVerificationRequested = () => ({
  type: AUTH_EMAIL_VERIFICATION_REQUESTED
})

export const emailVerificationSucceeded = payload => ({
  type: AUTH_EMAIL_VERIFICATION_SUCCEEDED,
  payload
})

export const emailVerificationFailed = payload => ({
  type: AUTH_EMAIL_VERIFICATION_FAILED,
  payload
})

export const emailVerificationResetState = payload => ({
  type: AUTH_EMAIL_VERIFICATION_RESET_STATE,
  payload
})
