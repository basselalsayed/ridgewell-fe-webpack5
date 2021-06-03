import axios from 'axios';
import { parseError } from 'helpers';
import produce from 'immer';
import { createAction } from 'store';
import { createApiAction } from 'store/middleware/api';
import { syncString } from 'store/middleware/offlineQueue';

import { holidaySchema, holidayRequestSchema, userSchema } from 'store/schemas';

import { getAllRequests } from './requests';
import { setError, setSuccess } from './response';
import { getNotifications } from './auth';

const SET_HOLIDAYS_LOADING = 'CONTENT/SET_HOLIDAYS_LOADING';
const SET_HOLIDAYS_LOADED = 'CONTENT/SET_HOLIDAYS_LOADED';
const SET_USER_HOLIDAYS_LOADING = 'CONTENT/SET_USER_HOLIDAYS_LOADING';
const SET_USER_HOLIDAYS_LOADED = 'CONTENT/SET_USER_HOLIDAYS_LOADED';
const SET_USERS_LOADING = 'CONTENT/SET_USERS_LOADING';
const SET_USERS_LOADED = 'CONTENT/SET_USERS_LOADED';

const SET_USER_REQUESTS_LOADING = 'CONTENT/SET_USER_REQUESTS_LOADING';
const SET_USER_REQUESTS_LOADED = 'CONTENT/SET_USER_REQUESTS_LOADED';

const initialState = {
  users: {
    loaded: false,
    loading: false,
    users: [],
  },
  holidays: {
    loaded: false,
    loading: false,
    holidays: [],
  },
};

const contentReducer = produce((state, { type, payload }) => {
  switch (type) {
    case SET_USERS_LOADING:
      state.users.loading = true;
      break;
    case SET_USERS_LOADED:
      state.users.loading = false;
      state.users.loaded = true;
      state.users.users = payload;
      break;
    case SET_USER_HOLIDAYS_LOADING:
      state.users[payload.data.userId] = {};
      state.users[payload.data.userId].loadingHolidays = true;
      break;
    case SET_USER_HOLIDAYS_LOADED:
      state.users[payload.data.userId].loadingHolidays = false;
      state.users[payload.data.userId].loadedHolidays = true;
      state.users[payload.data.userId].holidays = payload.result;
      break;
    case SET_USER_REQUESTS_LOADING:
      state.users[payload.data.userId] = {};
      state.users[payload.data.userId].loadingRequests = true;
      break;
    case SET_USER_REQUESTS_LOADED:
      state.users[payload.data.userId].loadingRequests = false;
      state.users[payload.data.userId].loadedRequests = true;
      state.users[payload.data.userId].requests = payload.result;
      break;
    case SET_HOLIDAYS_LOADING:
      state.holidays.loading = true;
      break;
    case SET_HOLIDAYS_LOADED:
      state.holidays.loading = false;
      state.holidays.loaded = true;
      state.holidays.holidays = payload;
      break;
    // no default
  }
}, initialState);

const getUsers = () =>
  createApiAction({
    types: [SET_USERS_LOADING, SET_USERS_LOADED],
    client: 'users',
    method: 'GET',
    meta: {
      queueIfOffline: true,
      offlineMessage: syncString`Users`,
    },
    schema: [userSchema],
  });

const getUserHolidays = (
  userId,
  [loading, loaded] = [SET_USER_HOLIDAYS_LOADING, SET_USER_HOLIDAYS_LOADED]
) =>
  createApiAction({
    types: [loading, loaded],
    client: 'decryptor',
    method: 'GET',
    url: `/holidays`,
    data: { userId },
    meta: {
      queueIfOffline: true,
      offlineMessage: syncString`Holidays`,
    },
    schema: [holidaySchema],
    onSuccess: (result) => createAction(loaded, { data: { userId }, result }),
  });

const getAllHolidays = () =>
  createApiAction({
    types: [SET_HOLIDAYS_LOADING, SET_HOLIDAYS_LOADED],
    client: 'decryptor',
    method: 'GET',
    url: `/holidays`,
    meta: {
      queueIfOffline: true,
      offlineMessage: syncString`Holidays`,
    },
    schema: [holidaySchema],
  });

const getUserRequests = (
  userId,
  types = [SET_USER_REQUESTS_LOADING, SET_USER_REQUESTS_LOADED]
) =>
  createApiAction({
    types,
    client: 'decryptor',
    method: 'GET',
    url: `/requests`,
    data: { userId },
    meta: {
      queueIfOffline: true,
      offlineMessage: syncString`Requests`,
    },
    schema: [holidayRequestSchema],
    onSuccess: (result) => createAction(types[1], { data: { userId }, result }),
  });

const getAll = (userId) => (dispatch) =>
  Promise.all(
    [
      dispatch(userId ? getUserRequests(userId) : getAllRequests()),
      dispatch(userId ? getUserHolidays(userId) : getAllHolidays()),
      !userId && dispatch(getUsers()),
      dispatch(getNotifications()),
    ].filter(Boolean)
  );

const updateNotification = (id, read) => (dispatch) =>
  axios
    .put(`/notifications/${id}`, { read: !read })
    .then(({ data: { message } }) => dispatch(setSuccess(message)))
    .finally(() => dispatch(getNotifications()))
    .catch((error) => dispatch(setError(parseError(error))));

export {
  contentReducer,
  getAll,
  getUsers,
  getAllHolidays,
  getUserHolidays,
  getUserRequests,
};

export default contentReducer;
