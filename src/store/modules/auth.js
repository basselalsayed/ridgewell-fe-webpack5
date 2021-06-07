import axios from 'axios';
import { decryptUser } from 'helpers';
import produce from 'immer';
import { decryptorInstance, usersInstance } from 'services/axios';
import { API_URL } from 'constants';
import { createAction } from 'store';
import { createApiAction } from 'store/middleware/api';
import { syncString } from 'store/middleware/offlineQueue';
import {
  holidayRequestSchema,
  holidaySchema,
  notificationSchema,
} from 'store/schemas';
import { UPDATE_NOTIFICATION_ENTITY } from './entities';

export const SET_USER = 'AUTH/SET_USER';
export const LOG_OUT = 'AUTH/LOG_OUT';
export const SET_OWN_HOLIDAYS_LOADING = 'AUTH/SET_OWN_HOLIDAYS_LOADING';
export const SET_OWN_HOLIDAYS_LOADED = 'AUTH/SET_OWN_HOLIDAYS_LOADED';
export const SET_OWN_REQUESTS_LOADING = 'AUTH/SET_OWN_REQUESTS_LOADING';
export const SET_OWN_REQUESTS_LOADED = 'AUTH/SET_OWN_REQUESTS_LOADED';
export const SET_NOTIFICATIONS_LOADING = 'AUTH/SET_NOTIFICATIONS_LOADING';
export const SET_NOTIFICATIONS_LOADED = 'AUTH/SET_NOTIFICATIONS_LOADED';
export const SET_NOTIFICATIONS_UPDATING = 'AUTH/SET_NOTIFICATIONS_UPDATING';
export const SET_NOTIFICATIONS_UPDATED = 'AUTH/SET_NOTIFICATIONS_UPDATED';

const initialState = {
  get user() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.defaults.headers = { 'x-access-token': user.accessToken };
      return decryptUser(user);
    }
    return null;
  },

  loggedIn: false,
  loadingHolidays: false,
  loadedHolidays: false,
  holidays: [],
  loadingRequests: false,
  loadedRequests: false,
  requests: [],
  loadedNotifications: false,
  loadingNotifications: false,
  updatingNotifications: false,
  updatedNotifications: false,
  notifications: [],
};

export default produce((state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      state.loggedIn = true;
      state.user = payload;
      break;
    case LOG_OUT:
      localStorage.clear();
      return {
        ...initialState,
        user: null,
      };
    case SET_OWN_HOLIDAYS_LOADING:
      state.loadingHolidays = true;
      break;
    case SET_OWN_HOLIDAYS_LOADED:
      state.loadingHolidays = false;
      state.loadedHolidays = true;
      state.holidays = payload.result;
      break;
    case SET_OWN_REQUESTS_LOADING:
      state.loadingRequests = true;
      break;
    case SET_OWN_REQUESTS_LOADED:
      state.loadingRequests = false;
      state.loadedRequests = true;
      state.requests = payload.result;
      break;
    case SET_NOTIFICATIONS_LOADING:
      state.loadingNotifications = true;
      break;
    case SET_NOTIFICATIONS_LOADED:
      state.loadingNotifications = false;
      state.loadedNotifications = true;
      state.notifications = payload.result;
      break;
    case SET_NOTIFICATIONS_UPDATING:
      state.updatingNotifications = true;
      break;
    case SET_NOTIFICATIONS_UPDATED:
      state.updatingNotifications = false;
      state.updatedNotifications = true;
      break;
    // no default
  }
}, initialState);

const setUser = (payload) => createAction(SET_USER, payload);

const handleUser = (user) => {
  axios.defaults.headers = { 'x-access-token': user.accessToken };
  decryptorInstance.defaults.headers = { 'x-access-token': user.accessToken };
  usersInstance.defaults.headers = { 'x-access-token': user.accessToken };

  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error("user couldn't be saved to local storage");
  }
};

export const logOut = () => createAction(LOG_OUT);

export const signUp = (userInfo) => (dispatch) =>
  axios.post(`${API_URL}users`, userInfo).then(({ data: { user } }) => {
    if (user && user.accessToken) {
      handleUser(user);
      dispatch(setUser(decryptUser(user)));
    }
  });

export const login = (userInfo) => (dispatch) =>
  axios.post(`${API_URL}session`, userInfo).then(({ data: { user } }) => {
    if (user && user.accessToken) {
      handleUser(user);
      dispatch(setUser(decryptUser(user)));
    }
  });

export const getOwnHolidays = (userId) =>
  createApiAction({
    types: [SET_OWN_HOLIDAYS_LOADING, SET_OWN_HOLIDAYS_LOADED],
    client: 'decryptor',
    method: 'GET',
    url: `/holidays`,
    data: { userId },
    meta: {
      queueIfOffline: true,
      offlineMessage: syncString`Holidays`,
    },
    schema: [holidaySchema],
  });

export const getOwnRequests = (userId) =>
  createApiAction({
    types: [SET_OWN_REQUESTS_LOADING, SET_OWN_REQUESTS_LOADED],
    client: 'decryptor',
    method: 'GET',
    url: `/requests`,
    data: { userId },
    meta: {
      queueIfOffline: true,
      offlineMessage: syncString`Requests`,
    },
    schema: [holidayRequestSchema],
  });

export const getNotifications = () =>
  createApiAction({
    types: [SET_NOTIFICATIONS_LOADING, SET_NOTIFICATIONS_LOADED],
    url: '/notifications',
    method: 'GET',
    client: 'decryptor',
    meta: {
      queueIfOffline: true,
      offlineMessage: syncString`Notifications`,
    },
    schema: [notificationSchema],
  });

// axios
//   .put(`/notifications/${id}`, { read: !read })
//   .then(({ data: { message } }) => dispatch(setSuccess(message)))
//   .finally(() => dispatch(getNotifications()))
//   .catch((error) => dispatch(setError(parseError(error))));

export const updateNotification = (id, read) =>
  createApiAction({
    types: [SET_NOTIFICATIONS_UPDATING, SET_NOTIFICATIONS_UPDATED],
    url: `/notifications/${id}`,
    method: 'PUT',
    data: { read },
    meta: {
      queueIfOffline: true,
      offlineMessage: syncString`Notifications`,
    },
    onSuccess: () =>
      createAction(UPDATE_NOTIFICATION_ENTITY, { id, data: { read } }),
  });
// export const autoLogin = () => dispatch => {
//   fetch(`http://localhost:4000/auto_login`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   })
//     .then(res => res.json())
//     .then(data => {
//      // data sent back will in the format of
//      // {
//      //     user: {},
//      //.    token: "aaaaa.bbbbb.bbbbb"
//      // }
//       localStorage.setItem('token', data.token);
//       dispatch(setUser(data.user));
//     });
// };
