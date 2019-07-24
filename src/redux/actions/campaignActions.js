import {
    GET_CAMPAIGN_REQUESTED,
    GET_CAMPAIGN_SUCCEEDED,
    GET_CAMPAIGN_FAILED,
    CREATE_CAMPAIGN_REQUESTED,
    CREATE_CAMPAIGN_SUCCEEDED,
    CREATE_CAMPAIGN_FAILED
  } from '../actionTypes';

import { getJSON, postJSON } from '../../services/fetch';
import { baseUrl } from '../../services/config';

export const getCampaigns = () => async (dispatch, getState) => {
    const token = localStorage.getItem('id_token');

    dispatch(getCampaignRequested());
    if (token) {
        const res = await getJSON(baseUrl + '/data/campaign');

        if (res && res.status === 'success') {
            dispatch(getCampaignSucceeded(res.data));
        } else {
            dispatch(getCampaignFailed());
        }
    } else {
        dispatch(getCampaignFailed());
    }
};

export const getCampaignRequested = () => ({
    type: GET_CAMPAIGN_REQUESTED
});

export const getCampaignSucceeded = (payload) => ({
    type: GET_CAMPAIGN_SUCCEEDED
});
  
export const getCampaignFailed = () => ({
    type: GET_CAMPAIGN_FAILED
});

export const createCampaigns = (data) => async (dispatch, getState) => {
    const token = localStorage.getItem('id_token');

    dispatch(createCampaignRequested());
    if (token) {
        const res = await postJSON(baseUrl + '/data/campaign', data, token);

        if (res && res.status === 'success') {
            dispatch(createCampaignSucceeded());
        } else {
            dispatch(createCampaignFailed());
        }
    } else {
        dispatch(createCampaignFailed());
    }
};

export const createCampaignRequested = () => ({
    type: CREATE_CAMPAIGN_REQUESTED
});

export const createCampaignSucceeded = (payload) => ({
    type: CREATE_CAMPAIGN_SUCCEEDED
});
  
export const createCampaignFailed = () => ({
    type: CREATE_CAMPAIGN_FAILED
});