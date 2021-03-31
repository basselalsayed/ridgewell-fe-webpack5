import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Header, Alert } from 'components';
import { useEffect } from 'react';
import { Routes } from '../Routes';

const App = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Use the window load event to keep the page load performant
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js');
      });
    }
  }, []);

  return (
    <Router>
      <Header />
      <Alert />
      <div>
        <div className="container mt-3">
          <Routes />
        </div>
      </div>
    </Router>
  );
};

export { App };
