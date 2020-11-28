import authReducer from './auth';
import contentReducer from './content';
import countdownReducer from './countdown';
import responseReducer from './response';

import { combineReducers } from 'redux';

export default combineReducers({
  authReducer,
  contentReducer,
  countdownReducer,
  responseReducer,
});
