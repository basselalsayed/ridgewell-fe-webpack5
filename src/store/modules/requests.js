import axios from 'axios';
import { parseError } from 'helpers';
import produce from 'immer';

import { createApiAction } from 'store/middleware/api';
import { syncString } from 'store/middleware/offlineQueue';
import { holidayRequestSchema } from 'store/schemas';

import { getAll, getAllHolidays } from './content';

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

const getAllRequests = () =>
  createApiAction({
    types: [SET_REQUESTS_LOADING, SET_REQUESTS_LOADED],
    client: 'decryptor',
    method: 'GET',
    url: `/requests`,
    meta: {
      queueIfOffline: true,
      offlineMessage: syncString`Requests`,
    },
    schema: [holidayRequestSchema],
  });

const postDeleteRequest = (id, setStatus) => async (dispatch) => {
  try {
    await axios.post('requests', { holidayId: id, type: 'delete' });
    setStatus('Success');
    return dispatch(getAllHolidays());
  } catch (error) {
    return setStatus(parseError(error));
  }
};

const postNewRequest = (data, setStatus) => async (dispatch) => {
  try {
    await axios.post('holidays', data);
    setStatus('Success');
    return dispatch(getAllHolidays());
  } catch (error) {
    return setStatus(parseError(error));
  }
};

const postUpdateRequest = (data, setStatus) => async (dispatch) => {
  try {
    await axios.post('requests', data);
    setStatus('Success');
    return dispatch(getAllHolidays());
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
  getAllRequests,
  postNewRequest,
  postUpdateRequest,
  postDeleteRequest,
};

export default requestsReducer;
