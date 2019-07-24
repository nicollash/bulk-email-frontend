import {
    GET_TEXT_TEMPLATE_REQUESTED,
    GET_TEXT_TEMPLATE_SUCCEEDED,
    GET_TEXT_TEMPLATE_FAILED
} from '../actionTypes';

const initialState = {
    textTemplates: [],
    isLoading: false
};

const actionHandlers = {
    [GET_TEXT_TEMPLATE_REQUESTED]: (state) => {
        return {
            ...state,
            isLoading: true
        }
    },
    [GET_TEXT_TEMPLATE_SUCCEEDED]: (state, payload) => {
        return {
            ...state,
            textTemplates: payload,
            isLoading: false
        }
    },
    [GET_TEXT_TEMPLATE_FAILED]: (state) => {
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