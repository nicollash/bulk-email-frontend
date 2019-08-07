import {
    CREATE_QUEUE_REQUESTED,
    CREATE_QUEUE_SUCCEEDED,
    CREATE_QUEUE_FAILED
  } from '../actionTypes';

const initialState = {
    queues: [],
    isLoading: false
};

const actionHandlers = {
    [CREATE_QUEUE_REQUESTED]: (state) => {
        return {
            ...state,
            isLoading: true
        }
    },
    [CREATE_QUEUE_SUCCEEDED]: (state) => {
        return {
            ...state,
            isLoading: false
        }
    },
    [CREATE_QUEUE_FAILED]: (state) => {
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