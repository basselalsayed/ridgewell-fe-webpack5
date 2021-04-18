import { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.min.css';
import './App.css';

import { Header, Alert } from 'components';
import { renderRoutes } from 'react-router-config';
import { useNetwork } from 'hooks/useNetwork';

const App = ({ route }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Use the window load event to keep the page load performant
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js');
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
