import axios from 'axios';
import { parseError } from '../../helpers';
import { decryptorInstance, usersInstance } from '../../services/axios';
import { setError, setSuccess } from './response';

const setContent = (type, payload) => ({ type, payload });

const getUsers = () => async dispatch =>
  await usersInstance
    .get()
    .then(({ data }) => dispatch(setContent('SET_USERS', data)))
    .catch(error => dispatch(setError(parseError(error))));

const getHolidays = userId => async dispatch =>
  await decryptorInstance
    .get(userId ? `holidays?userId=${userId}` : 'holidays')
    .then(({ data }) => dispatch(setContent('SET_HOLIDAYS', data)))
    .catch(error => dispatch(setError(parseError(error))));

const getRequests = userId => async dispatch =>
  await decryptorInstance
    .get(userId ? `requests?userId=${userId}` : 'requests')
    .then(({ data }) => dispatch(setContent('SET_REQUESTS', data)))
    .catch(error => dispatch(setError(parseError(error))));

const getNotifications = () => async dispatch =>
  await decryptorInstance
    .get('notifications')
    .then(({ data }) => dispatch(setContent('SET_NOTIFICATIONS', data)))
    .catch(error => dispatch(setError(parseError(error))));

const getAll = userId => async dispatch =>
  await Promise.all([
    dispatch(getRequests(userId)),
    dispatch(getHolidays(userId)),
    !userId && dispatch(getUsers()),
    dispatch(getNotifications()),
  ]);

const updateNotification = (id, read) => async dispatch =>
  await axios
    .put(`/notifications/${id}`, { read: !read })
    .then(({ data: { message } }) => dispatch(setSuccess(message)))
    .catch(error => dispatch(setError(parseError(error))));

const postHolidays = params => {};

const postRequests = params => {};

export {
  getAll,
  getUsers,
  getHolidays,
  getNotifications,
  getRequests,
  postHolidays,
  postRequests,
  updateNotification,
};
