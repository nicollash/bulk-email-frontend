import {
  GET_CAMPAIGN_REQUESTED,
  GET_CAMPAIGN_SUCCEEDED,
  GET_CAMPAIGN_FAILED,
  CREATE_CAMPAIGN_REQUESTED,
  CREATE_CAMPAIGN_SUCCEEDED,
  CREATE_CAMPAIGN_FAILED
} from "../actionTypes";

import { getJSON, postJSON } from "../../services/fetch";
import { baseUrl } from "../../services/config";
import { Auth } from "aws-amplify";

export const getCampaigns = () => async (dispatch, getState) => {
  try {
    const token = await Auth.currentSession();
    dispatch(getCampaignRequested());
    const res = await getJSON(
      baseUrl + "data/campaign",
      token.idToken.jwtToken
    );
    if (res && res.status === "success") {
      dispatch(getCampaignSucceeded(res.content.items));
    } else {
      dispatch(getCampaignFailed());
    }
  } catch (error) {
    dispatch(getCampaignFailed());
  }
};

export const getCampaignRequested = () => ({
  type: GET_CAMPAIGN_REQUESTED
});

export const getCampaignSucceeded = payload => ({
  type: GET_CAMPAIGN_SUCCEEDED,
  payload
});

export const getCampaignFailed = () => ({
  type: GET_CAMPAIGN_FAILED
});

export const createCampaigns = data => async (dispatch, getState) => {
  try {
    const token = await Auth.currentSession();
    dispatch(createCampaignRequested());
    const res = await postJSON(
      baseUrl + "data/campaign",
      data,
      token.idToken.jwtToken
    );
    if (res && res.status === "success") {
      dispatch(createCampaignSucceeded());
    } else {
      dispatch(createCampaignFailed());
    }
  } catch (error) {
    dispatch(createCampaignFailed());
  }
};

export const createCampaignRequested = () => ({
  type: CREATE_CAMPAIGN_REQUESTED
});

export const createCampaignSucceeded = payload => ({
  type: CREATE_CAMPAIGN_SUCCEEDED
});

export const createCampaignFailed = () => ({
  type: CREATE_CAMPAIGN_FAILED
});
