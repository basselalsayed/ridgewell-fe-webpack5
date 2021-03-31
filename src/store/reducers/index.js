import { combineReducers } from 'redux';
import authReducer from './auth';
import contentReducer from '../modules/content';
import countdownReducer from './countdown';
import responseReducer from './response';

export default combineReducers({
  authReducer,
  contentReducer,
  countdownReducer,
  responseReducer,
});
