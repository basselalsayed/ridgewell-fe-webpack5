import { routerMiddleware } from 'connected-react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';

const configureStore = () => {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    }) || compose;

  const history = createBrowserHistory();

  const middleware = [thunk, routerMiddleware(history)];

  const store = createStore(
    createRootReducer(history),
    composeEnhancer(applyMiddleware(...middleware))
  );

  return { history, store };
};

export default configureStore;
