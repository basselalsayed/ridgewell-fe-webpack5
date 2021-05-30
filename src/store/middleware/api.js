import axios from 'axios';
import { parseError } from 'helpers';
import { normalize } from 'normalizr';
import { decryptorInstance, usersInstance } from 'services/axios';
import { createAction } from 'store';
import { SET_ENTITIES } from 'store/modules';
import { setError } from 'store/modules/response';

const API = 'API_REQUEST';

const createApiAction = ({
  client = '',
  types = [],
  url = '',
  method = 'GET',
  meta = {},
  data = null,
  onSuccess = () => {},
  onFailure = () => {},
  schema = null,
}) => ({
  type: API,
  meta,
  payload: {
    client,
    data,
    method,
    onSuccess,
    onFailure,
    schema,
    types,
    url,
  },
});

const clients = {
  users: usersInstance,
  decryptor: decryptorInstance,
};

const apiMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== API) {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  }

  const {
    payload: { client, url, method, data, onSuccess, onFailure, types, schema },
  } = action;

  const [SET_LOADING, SET_LOADED] = types;

  dispatch(createAction(SET_LOADING));

  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  const apiClient = clients[client] || axios;

  apiClient
    .request({
      url,
      method,
      [dataOrParams]: data,
    })
    .then(({ data: resData }) => {
      if (schema) {
        const { entities, result } = normalize(resData, schema);

        next(createAction(SET_ENTITIES, entities));
        return dispatch(createAction(SET_LOADED, result)), onSuccess();
      }
      return dispatch(createAction(SET_LOADED, resData)), onSuccess();
    })
    .catch((error) => dispatch(setError(parseError(error)), onFailure()));
};
export { API, createApiAction };
export default apiMiddleware;
