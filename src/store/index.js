import { routerMiddleware } from 'connected-react-router';
import { createStore, compose, applyMiddleware } from 'redux';

import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';
import offlineMiddleware from './middleware/offlineQueue';
import apiMiddleware from './middleware/api';

const configureStore = () => {
  const composeEnhancer =
    __CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          trace: true,
          traceLimit: 25,
        })
      : compose;

  const history = createBrowserHistory();

  const middleware = [
    offlineMiddleware,
    apiMiddleware,
    routerMiddleware(history),
  ];

  const store = createStore(
    createRootReducer(history),
    composeEnhancer(applyMiddleware(...middleware))
  );

  return { history, store };
};

export default configureStore;
