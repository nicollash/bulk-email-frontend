import {
  GET_CATEGORY_REQUESTED,
  GET_CATEGORY_SUCCEEDED,
  GET_CATEGORY_FAILED
} from '../actionTypes';

import { getJSON } from '../../services/fetch';
import { baseUrl } from '../../services/config';
import { Auth } from 'aws-amplify';

export const getCategoryRequested = () => ({
  type: GET_CATEGORY_REQUESTED
});

export const getCategorySucceeded = payload => ({
  type: GET_CATEGORY_SUCCEEDED
});

export const getCategoryFailed = () => ({
  type: GET_CATEGORY_FAILED
});

export const getCategories = () => async (dispatch, getState) => {
  try {
    const token = await Auth.currentSession();
    dispatch(getCategoryRequested());
    const res = await getJSON(
      baseUrl + 'data/category',
      token.idToken.jwtToken
    );
    if (res && res.status === 'success') {
      dispatch(getCategorySucceeded(res.data));
    } else {
      dispatch(getCategoryFailed());
    }
  } catch (error) {
    dispatch(getCategoryFailed());
  }
};
