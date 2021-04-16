import axios from 'axios';
import { parseError } from 'helpers';
import produce from 'immer';

import { decryptorInstance, usersInstance } from '../../services/axios';
import { getRequests } from './requests';
import { setError, setSuccess } from './response';

const SET_USERS = 'CONTENT/SET_USERS';
const SET_HOLIDAYS = 'CONTENT/SET_HOLIDAYS';
const SET_HOLIDAYS_LOADING = 'CONTENT/SET_HOLIDAYS_LOADING';
const SET_HOLIDAYS_LOADED = 'CONTENT/SET_HOLIDAYS_LOADED';
const SET_NOTIFICATIONS = 'CONTENT/SET_NOTIFICATIONS';

const initialState = {
  users: null,
  holidays: {
    loaded: null,
    loading: null,
    holidays: [],
  },
  notifications: null,
};

const contentReducer = produce((state, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      state.users = payload;
      break;
    case SET_HOLIDAYS:
      state.holidays.holidays = payload;
      break;
    case SET_HOLIDAYS_LOADING:
      state.holidays.loading = true;
      break;
    case SET_HOLIDAYS_LOADED:
      state.holidays.loading = false;
      state.holidays.loaded = true;
      state.holidays.holidays = payload;
      break;
    case SET_NOTIFICATIONS:
      state.notifications = payload;
      break;
    // no default
  }
}, initialState);

const setContent = (type, payload, ...rest) => ({ type, payload, ...rest });

const getUsers = () => (dispatch) =>
  usersInstance
    .get()
    .then(({ data }) => dispatch(setContent(SET_USERS, data)))
    .catch((error) => dispatch(setError(parseError(error))));

const getHolidays = (userId = null) => async (dispatch) => {
  dispatch(setContent(SET_HOLIDAYS_LOADING));

  await decryptorInstance
    .get(userId ? `holidays?userId=${userId}` : 'holidays')
    .then(({ data }) => dispatch(setContent(SET_HOLIDAYS_LOADED, data)))
    .catch((error) => dispatch(setError(parseError(error))));
};

const getNotifications = () => (dispatch) =>
  decryptorInstance
    .get('notifications')
    .then(({ data }) => dispatch(setContent(SET_NOTIFICATIONS, data)))
    .catch((error) => dispatch(setError(parseError(error))));

const getAll = (userId) => (dispatch) =>
  Promise.all(
    [
      dispatch(getRequests(userId)),
      dispatch(getHolidays(userId)),
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
  getHolidays,
  getNotifications,
  updateNotification,
};

export default contentReducer;
