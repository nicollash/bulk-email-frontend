import {
    GET_CAMPAIGN_REQUESTED,
    GET_CAMPAIGN_SUCCEEDED,
    GET_CAMPAIGN_FAILED,
    CREATE_CAMPAIGN_REQUESTED,
    CREATE_CAMPAIGN_SUCCEEDED,
    CREATE_CAMPAIGN_FAILED
  } from '../actionTypes';

const initialState = {
    campaigns: [],
    isLoading: false
};

const actionHandlers = {
    [ GET_CAMPAIGN_REQUESTED ]: (state) => {
        return {
            ...state,
            isLoading: true
        }
    },
    [ GET_CAMPAIGN_SUCCEEDED ]: (state, { type, payload }) => {
        return {
            ...state,
            campaigns: payload,
            isLoading: false
        }
    },
    [ GET_CAMPAIGN_FAILED ]: (state) => {
        return {
            ...state,
            isLoading: false
        }
    },
    [ CREATE_CAMPAIGN_REQUESTED ]: (state) => {
        return {
            ...state,
            isLoading: true
        }
    },
    [ CREATE_CAMPAIGN_SUCCEEDED ]: (state) => {
        return {
            ...state,
            isLoading: false
        }
    },
    [ CREATE_CAMPAIGN_FAILED ]: (state) => {
        return {
            ...state,
            isLoading: false
        }
    }
};

export default function (state = initialState, action) {
    const handler = actionHandlers[ action.type ];
    return handler ? handler(state, action) : state;
};