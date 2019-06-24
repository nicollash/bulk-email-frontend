import { LOAD_STARTUP_DATA, STARTUP_DATA_LOADED, GET_USER_INFO } from "../actionTypes";


export const getUserInfo = () => ({
  type: GET_USER_INFO
});

export const loadStartupData = () => ({
  type: LOAD_STARTUP_DATA
});

export const startupDataLoaded = () => ({
  type: STARTUP_DATA_LOADED
});
