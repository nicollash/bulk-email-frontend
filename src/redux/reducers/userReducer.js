import {
  GET_USER_REQUESTED,
  GET_USER_SUCCEEDED,
  GET_USER_FAILED
} from '../actions/userActions'

const initialState = {
  isLoading: false
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_USER_REQUESTED:
      return {
        ...state,
        isLoading: true
      }
    case GET_USER_SUCCEEDED:
      return {
        ...state,
        ...payload,
        isLoading: false
      }
    case GET_USER_FAILED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
