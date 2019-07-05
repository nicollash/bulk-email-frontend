/* eslint-disable no-undef */
import { getJSON } from '../../services/fetch'

export const GET_USER_REQUESTED = 'GET_USER_REQUESTED'
export const GET_USER_SUCCEEDED = 'GET_USER_SUCCEEDED'
export const GET_USER_FAILED = 'GET_USER_FAILED'

const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://internal.chatmantics.com/dev/'

export const getUser = () => async (dispatch, getState) => {
  const token = localStorage.getItem('id_token')
  dispatch(getUserRequested())
  if (token) {
    const res = await getJSON(
      baseUrl + 'data/current_user', token)

    if (res.status === 'success') {
      dispatch(getUserSucceeded(res.content))
    } else {
      dispatch(getUserFailed())
    }
    return res
  } else {
    dispatch(getUserFailed())
  }
}

export const getUserRequested = () => ({
  type: GET_USER_REQUESTED
})

export const getUserSucceeded = (payload) => ({
  type: GET_USER_SUCCEEDED,
  payload
})

export const getUserFailed = () => ({
  type: GET_USER_FAILED
})
