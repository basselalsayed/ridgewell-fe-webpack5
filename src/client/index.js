import { StrictMode } from 'react';
import { hydrate, render } from 'react-dom';

import './index.css';
// import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Provider } from 'react-redux';
import axios from 'axios';
import { ReduxAsyncConnect } from 'redux-connect';
import routes from 'Routes';
// import * as serviceWorker from './serviceWorker';

import { loadableReady } from '@loadable/component';
import { enableAllPlugins } from 'immer';
import configureStore from '../store';

import { API_URL } from '../constants';
import { authHeaderFromStore } from '../services/auth-header';
import { decryptorInstance, usersInstance } from '../services/axios';

enableAllPlugins();
const { history, store: newStore } = configureStore();

const store = window.store || newStore;

delete window.store;

axios.defaults.baseURL = API_URL;
const headers = authHeaderFromStore(store);

[axios, decryptorInstance, usersInstance].forEach((client) => {
  client.defaults.headers = headers;
});
// axios.defaults.headers = authHeaderFromStore(store);
// decryptorInstance.defaults.headers = authHeaderFromStore(store);
// usersInstance.defaults.headers = authHeaderFromStore(store);
axios.defaults.timeout = 10000;

const app = (
  <StrictMode>
    <Provider store={store}>
      <Router store={store} history={history}>
        <ReduxAsyncConnect routes={routes(store)} />
      </Router>
    </Provider>
  </StrictMode>
);
const appRoot = document.getElementById('root');

if (__DISABLE_SSR__) {
  render(app, appRoot);
} else {
  loadableReady(() => hydrate(app, appRoot));
}

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }

  if (!window.store) {
    window.store = store;
  }
}
