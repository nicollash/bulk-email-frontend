import {
    GET_TEXT_TEMPLATE_REQUESTED,
    GET_TEXT_TEMPLATE_SUCCEEDED,
    GET_TEXT_TEMPLATE_FAILED
  } from '../actionTypes';

import { getJSON } from '../../services/fetch';
import { baseUrl } from '../../services/config';

export const getTextTemplates = (campaignId) => async (dispatch, getState) => {
    const token = localStorage.getItem('id_token');

    dispatch(getTextTemplatesRequested());
    if (token) {
        const res = await getJSON(baseUrl + '/data/text_template?campaignid=' + campaignId);

        if (res && res.status === 'success') {
            dispatch(getTextTemplatesSucceeded(res.data));
        } else {
            dispatch(getTextTemplatesFailed());
        }
    } else {
        dispatch(getTextTemplatesFailed());
    }
};

export const getTextTemplatesRequested = () => ({
    type: GET_TEXT_TEMPLATE_REQUESTED
});

export const getTextTemplatesSucceeded = (payload) => ({
    type: GET_TEXT_TEMPLATE_SUCCEEDED
});
  
export const getTextTemplatesFailed = () => ({
    type: GET_TEXT_TEMPLATE_FAILED
});