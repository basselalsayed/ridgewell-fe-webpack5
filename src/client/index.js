import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Provider } from 'react-redux';
import axios from 'axios';
import { ReduxAsyncConnect } from 'redux-connect';
import routes from 'Routes';
// import * as serviceWorker from './serviceWorker';

import configureStore from '../store';

import { authHeaderFromStore } from '../services/auth-header';
import { API_URL } from '../constants';
import { decryptorInstance, usersInstance } from '../services/axios';

const { history, store } = configureStore();
axios.defaults.baseURL = API_URL;
const headers = authHeaderFromStore(store);

[axios, decryptorInstance, usersInstance].forEach((client) => {
  client.defaults.headers = headers;
});
// axios.defaults.headers = authHeaderFromStore(store);
// decryptorInstance.defaults.headers = authHeaderFromStore(store);
// usersInstance.defaults.headers = authHeaderFromStore(store);
axios.defaults.timeout = 10000;

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router store={store} history={history}>
        <ReduxAsyncConnect routes={routes(store)} />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// serviceWorker.unregister();
