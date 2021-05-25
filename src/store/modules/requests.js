import axios from 'axios';
import { parseError } from 'helpers';
import produce from 'immer';

import { decryptorInstance } from '../../services/axios';
import { getAll, getHolidays } from './content';
import { setError } from './response';

const SET_REQUESTS = 'CONTENT/SET_REQUESTS';
const SET_REQUESTS_LOADING = 'CONTENT/SET_REQUESTS_LOADING';
const SET_REQUESTS_LOADED = 'CONTENT/SET_REQUESTS_LOADED';

const initialState = {
  loaded: null,
  loading: null,
  requests: [],
};

const requestsReducer = produce((state, { type, payload }) => {
  switch (type) {
    case SET_REQUESTS_LOADING:
      state.loading = true;
      break;
    case SET_REQUESTS_LOADED:
      state.loading = false;
      state.loaded = true;
      state.requests = payload;
      break;
    case SET_REQUESTS:
      state.requests = payload;
      break;
    // no default
  }
}, initialState);

const setContent = (type, payload, ...rest) => ({ type, payload, ...rest });

const getRequests = (userId = null) => async (dispatch) => {
  dispatch(setContent(SET_REQUESTS_LOADING));

  await decryptorInstance
    .get(userId ? `requests?userId=${userId}` : 'requests')
    .then(({ data }) => dispatch(setContent(SET_REQUESTS_LOADED, data)))
    .catch((error) => dispatch(setError(parseError(error))));
};

const postDeleteRequest = (id, setStatus) => async (dispatch) => {
  try {
    await axios.post('requests', { holidayId: id, type: 'delete' });
    setStatus('Success');
    return dispatch(getHolidays());
  } catch (error) {
    return setStatus(parseError(error));
  }
};

const postNewRequest = (data, setStatus) => async (dispatch) => {
  try {
    await axios.post('holidays', data);
    setStatus('Success');
    return dispatch(getHolidays());
  } catch (error) {
    return setStatus(parseError(error));
  }
};

const postUpdateRequest = (data, setStatus) => async (dispatch) => {
  try {
    await axios.post('requests', data);
    setStatus('Success');
    return dispatch(getHolidays());
  } catch (error) {
    return setStatus(parseError(error));
  }
};

// const confirmRequest = (id, setStatus) => async (dispatch) => {
//   try {
//     const res = await axios.put(`requests/${id}/confirm`);
//     setStatus(res.data.message);
//     return dispatch(getAll());
//   } catch (error) {
//     return setStatus(parseError(error));
//   }
// };

const confirmRequest = (id, setStatus) => (dispatch) =>
  axios
    .put(`requests/${id}/confirm`)
    .then((res) => (setStatus(res.data.message), dispatch(getAll())))
    .catch((error) => setStatus(parseError(error)));

const denyRequest = (id, setStatus) => (dispatch) =>
  axios
    .put(`requests/${id}/deny`)
    .then((res) => (setStatus(res.data.message), dispatch(getAll())))
    .catch((error) => setStatus(parseError(error)));

export {
  confirmRequest,
  denyRequest,
  getRequests,
  postNewRequest,
  postUpdateRequest,
  postDeleteRequest,
};

export default requestsReducer;
