import {
    GET_CATEGORY_REQUESTED,
    GET_CATEGORY_SUCCEEDED,
    GET_CATEGORY_FAILED
  } from '../actionTypes';

const initialState = {
    categories: [],
    isLoading: false
};

const actionHandlers = {
    [GET_CATEGORY_REQUESTED]: (state) => {
        return {
            ...state,
            isLoading: true
        }
    },
    [GET_CATEGORY_SUCCEEDED]: (state, payload) => {
        return {
            ...state,
            categories: payload,
            isLoading: false
        }
    },
    [GET_CATEGORY_FAILED]: (state) => {
        return {
            ...state,
            isLoading: false
        }
    }
};

export default function (state = initialState, action) {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
};