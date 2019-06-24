export const LOAD_STARTUP_DATA = 'LOAD_STARTUP_DATA';
export const STARTUP_DATA_LOADED = 'STARTUP_DATA_LOADED';
export const GET_USER_INFO = 'GET_USER_INFO';

export const getUserInfo = () => ({
	type: GET_USER_INFO
});

export const loadStartupData = () => ({
  type: LOAD_STARTUP_DATA
});

export const startupDataLoaded = () => ({
  type: STARTUP_DATA_LOADED
});
