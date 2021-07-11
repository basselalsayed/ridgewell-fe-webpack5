import { useEffect } from 'react';
// import /* webpackPreload: true */ 'bootstrap/dist/css/bootstrap.min.css';
// import './bootstrap.min.css';
import /* webpackPreload: true */ './App.scss';

import { renderRoutes } from 'react-router-config';
import { useNetwork } from 'hooks/useNetwork';

import { Alert, Header } from 'components';

const App = ({ route }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Use the window load event to keep the page load performant
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./static/service-worker.js');
      });
    }
  }, []);

  useNetwork();

  return (
    <>
      <Header />

      <Alert />
      <div>
        <div className="container mt-3">{renderRoutes(route.routes)}</div>
      </div>
    </>
  );
};

export { App };
export default App;
