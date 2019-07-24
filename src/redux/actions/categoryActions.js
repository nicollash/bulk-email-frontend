import {
    GET_CATEGORY_REQUESTED,
    GET_CATEGORY_SUCCEEDED,
    GET_CATEGORY_FAILED
  } from '../actionTypes';

import { getJSON } from '../../services/fetch';
import { baseUrl } from '../../services/config';

export const getCategories = () => async (dispatch, getState) => {
    const token = localStorage.getItem('id_token');

    dispatch(getCategoryRequested());
    if (token) {
        const res = await getJSON(baseUrl + '/data/category');

        if (res && res.status === 'success') {
            dispatch(getCategorySucceeded(res.data));
        } else {
            dispatch(getCategoryFailed());
        }
    } else {
        dispatch(getCategoryFailed());
    }
};

export const getCategoryRequested = () => ({
    type: GET_CATEGORY_REQUESTED
});

export const getCategorySucceeded = (payload) => ({
    type: GET_CATEGORY_SUCCEEDED
});
  
export const getCategoryFailed = () => ({
    type: GET_CATEGORY_FAILED
});