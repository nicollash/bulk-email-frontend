import {
  signInUser,
  createPassword,
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
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS'
export const NEW_PASSWORD_FAILD = 'NEW_PASSWORD_FAILD'
export const AUTH_FORGOT_CODE_SENT = 'AUTH_FORGOT_CODE_SENT'
export const AUTH_PASSWORD_CHANGE_SUCCEEDED = 'AUTH_PASSWORD_CHANGE_SUCCEEDED'
export const AUTH_PASSWORD_CHANGE_FAILED = 'AUTH_PASSWORD_CHANGE_FAILED'
export const AUTH_USER_SIGNED_OUT = 'AUTH_USER_SIGNED_OUT'
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

  if (!userProfile.code) {
    dispatch(setNewPasswordSuccess())
  } else {
    dispatch(setNewPasswordFaild())
  }
}

export const setNewPasswordSuccess = () => ({
  type: NEW_PASSWORD_SUCCESS
})

export const setNewPasswordFaild = () => ({
  type: NEW_PASSWORD_FAILD
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