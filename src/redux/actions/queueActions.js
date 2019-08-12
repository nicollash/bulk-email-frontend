import {
  CREATE_QUEUE_REQUESTED,
  CREATE_QUEUE_SUCCEEDED,
  CREATE_QUEUE_FAILED,
  GET_QUEUES_REQUESTED,
  GET_QUEUES_SUCCEEDED,
  GET_QUEUES_FAILED
} from '../actionTypes';

import { getJSON, postJSON } from '../../services/fetch';
import { baseUrl } from '../../services/config';
import { Auth } from 'aws-amplify';

export const createQueueRequested = () => ({
  type: CREATE_QUEUE_REQUESTED
});

export const createQueueSucceeded = payload => ({
  type: CREATE_QUEUE_SUCCEEDED
});

export const createQueueFailed = () => ({
  type: CREATE_QUEUE_FAILED
});

export const getQueuesRequested = () => ({
  type: GET_QUEUES_REQUESTED
});

export const getQueuesSucceeded = payload => ({
  type: GET_QUEUES_SUCCEEDED,
  payload
});

export const getQueuesFailed = () => ({
  type: GET_QUEUES_FAILED
});

export const createQueue = data => async (dispatch, getState) => {
  try {
    const token = await Auth.currentSession();
    dispatch(createQueueRequested());
    const res = await postJSON(
      baseUrl + 'queue',
      data,
      token.idToken.jwtToken
    );
    if (res && res.status === 'success') {
      dispatch(createQueueSucceeded());
    } else {
      dispatch(createQueueFailed());
    }
  } catch (error) {
    dispatch(createQueueFailed());
  }
};

export const getQueues = () => async (dispatch, getState) => {
  try {
    const token = await Auth.currentSession();

    dispatch(getQueuesRequested());
    const res = await getJSON(
      baseUrl + 'data/bulk_job',
      token.idToken.jwtToken
    );
    
    if (res && res.status === 'success') {
      dispatch(getQueuesSucceeded(res.content.items));
    } else {
      dispatch(getQueuesFailed());
    }
  } catch (error) {
    dispatch(getQueuesFailed());
  }
};
