import {
  signInUser,
  createPassword,
  forgotPassword,
  changePasswordWithCode,
  refreshToken,
} from '../../services/aws/aws_cognito'

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
  AUTH_INIT_PASSWORD_STATE
} from '../actionTypes'

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
  }
}

export const forgotCodeSent = payload => ({
  type: AUTH_FORGOT_CODE_SENT,
  payload
})

export const login = values => async (dispatch, getState) => {
  dispatch(loginRequested())
  try {
    const userProfile = await signInUser(values.username, values.password)
    if (userProfile.challengeName === 'NEW_PASSWORD_REQUIRED') {
      dispatch(resetNewPassword(userProfile))
    } else {
      dispatch(loginSucceeded(userProfile))
    } 
  } catch (error) {
    dispatch(loginFailed())
    setTimeout(function () {
      dispatch(loginResetState())
    }, 500)
  }
}

export const createNewPassword = values => async (dispatch, getState) => {
  try {
    const userProfile = await createPassword(values.user, values.password)
    if (!userProfile.challengeName) dispatch(setNewPasswordSuccess())
    else throw Error('Something went wrong!');
  } catch (error) {
    dispatch(setNewPasswordFailed())
  }
}

export const setNewPasswordSuccess = () => ({
  type: NEW_PASSWORD_SUCCESS
})

export const setNewPasswordFailed = () => ({
  type: NEW_PASSWORD_FAILED
})

export const loginResetState = () => ({
  type: AUTH_LOGIN_RESET_STATE
})

export const resetNewPassword = (payload) => ({
  type: NEW_PASSWORD_REQUIRED,
  payload
})

export const setNewPasswordPending = () => ({
  type: NEW_PASSWORD_PENDING,
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