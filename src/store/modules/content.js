import axios from 'axios';
import { parseError } from 'helpers';
import { setError, setSuccess } from 'store/actions/response';
import { decryptorInstance, usersInstance } from '../../services/axios';

const SET_USERS = 'CONTENT/SET_USERS';
const SET_HOLIDAYS = 'CONTENT/SET_HOLIDAYS';
const SET_REQUESTS = 'CONTENT/SET_REQUESTS';
const SET_NOTIFICATIONS = 'CONTENT/SET_NOTIFICATIONS';

const initialState = {
  users: null,
  holidays: null,
  requests: null,
  notifications: null,
};

const contentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      return { ...state, users: payload };
    case SET_HOLIDAYS:
      return { ...state, holidays: payload };
    case SET_REQUESTS:
      return { ...state, requests: payload };
    case SET_NOTIFICATIONS:
      return { ...state, notifications: payload };

    default:
      return state;
  }
};

const setContent = (type, payload) => ({ type, payload });

const getUsers = () => (dispatch) =>
  usersInstance
    .get()
    .then(({ data }) => dispatch(setContent(SET_USERS, data)))
    .catch((error) => dispatch(setError(parseError(error))));

const getHolidays = (userId) => (dispatch) =>
  decryptorInstance
    .get(userId ? `holidays?userId=${userId}` : 'holidays')
    .then(({ data }) => dispatch(setContent(SET_HOLIDAYS, data)))
    .catch((error) => dispatch(setError(parseError(error))));

const getRequests = (userId) => (dispatch) =>
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
  Promise.all([
    dispatch(getRequests(userId)),
    dispatch(getHolidays(userId)),
    !userId && dispatch(getUsers()),
    dispatch(getNotifications()),
  ]);

const updateNotification = (id, read) => (dispatch) =>
  axios
    .put(`/notifications/${id}`, { read: !read })
    .then(({ data: { message } }) => dispatch(setSuccess(message)))
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
