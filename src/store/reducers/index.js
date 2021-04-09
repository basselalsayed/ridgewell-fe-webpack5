import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import content from '../modules/content';
import countdown from './countdown';
import response from './response';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    reduxAsyncConnect,
    auth,
    content,
    countdown,
    response,
  });
