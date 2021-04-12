import axios from 'axios';
import { parseError } from 'helpers';
import { setError, setSuccess } from 'store/actions/response';
import { decryptorInstance, usersInstance } from '../../services/axios';

const SET_USERS = 'CONTENT/SET_USERS';
const SET_HOLIDAYS = 'CONTENT/SET_HOLIDAYS';
const SET_HOLIDAYS_LOADING = 'CONTENT/SET_HOLIDAYS_LOADING';
const SET_HOLIDAYS_LOADED = 'CONTENT/SET_HOLIDAYS_LOADED';
const SET_REQUESTS = 'CONTENT/SET_REQUESTS';
const SET_NOTIFICATIONS = 'CONTENT/SET_NOTIFICATIONS';

const initialState = {
  users: null,
  holidays: {
    loaded: null,
    loading: null,
    holidays: [],
  },
  requests: null,
  notifications: null,
};

const contentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      return { ...state, users: payload };
    case SET_HOLIDAYS:
      return { ...state, holidays: { holidays: payload } };
    case SET_HOLIDAYS_LOADING:
      return { ...state, holidays: { loading: true } };
    case SET_HOLIDAYS_LOADED:
      return {
        ...state,
        holidays: { loading: false, loaded: true, holidays: payload },
      };
    case SET_REQUESTS:
      return { ...state, requests: payload };
    case SET_NOTIFICATIONS:
      return { ...state, notifications: payload };

    default:
      return state;
  }
};

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

const getRequests = (userId = null) => (dispatch) =>
  decryptorInstance
    .get(userId ? `requests?userId=${userId}` : 'requests')
    .then(({ data }) => dispatch(setContent(SET_REQUESTS, data)))
    .catch((error) => dispatch(setError(parseError(error))));

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
  getRequests,
  updateNotification,
};

export default contentReducer;
