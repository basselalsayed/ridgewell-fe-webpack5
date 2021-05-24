import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { connectRouter } from 'connected-react-router';
import auth from '../modules/auth';
import content from '../modules/content';
import countdown from './countdown';
import network from '../modules/network';
import response from '../modules/response';
import requests from '../modules/requests';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    reduxAsyncConnect,
    auth,
    content,
    countdown,
    network,
    response,
    requests,
  });
