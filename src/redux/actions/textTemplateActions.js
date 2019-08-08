import {
  GET_TEXT_TEMPLATE_REQUESTED,
  GET_TEXT_TEMPLATE_SUCCEEDED,
  GET_TEXT_TEMPLATE_FAILED
} from "../actionTypes";

import { getJSON } from "../../services/fetch";
import { baseUrl } from "../../services/config";
import { Auth } from "aws-amplify";

export const getTextTemplates = campaignId => async (dispatch, getState) => {
  try {
    const token = await Auth.currentSession();
    dispatch(getTextTemplatesRequested());

    const res = await getJSON(
      baseUrl + "data/text_template?campaignid=" + campaignId,
      token.idToken.jwtToken
    );

    if (res && res.status === "success") {
      dispatch(getTextTemplatesSucceeded(res.data));
    } else {
      dispatch(getTextTemplatesFailed());
    }
  } catch (error) {
    dispatch(getTextTemplatesFailed());
  }
};

export const getTextTemplatesRequested = () => ({
  type: GET_TEXT_TEMPLATE_REQUESTED
});

export const getTextTemplatesSucceeded = payload => ({
  type: GET_TEXT_TEMPLATE_SUCCEEDED
});

export const getTextTemplatesFailed = () => ({
  type: GET_TEXT_TEMPLATE_FAILED
});
