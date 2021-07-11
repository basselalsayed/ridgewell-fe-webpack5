import { createBrowserHistory, createMemoryHistory } from 'history';

const createIsomorphicHistory = (url = '/') =>
  __CLIENT__
    ? createBrowserHistory({ basename: url })
    : createMemoryHistory({ initialEntries: [url] });

export default createIsomorphicHistory;
