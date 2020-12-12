import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  Login,
  Register,
  Home,
  Profile,
  BoardUser,
  BoardAdmin,
  Header,
  Alert,
  PrivateRoute,
} from '../components';

const App = () => (
  <Router>
    <Header />
    <Alert />
    <div>
      <div className="container mt-3">
        <Switch>
          <PrivateRoute exact path={['/', '/home']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute path="/user" component={BoardUser} />
          <PrivateRoute path="/admin" component={BoardAdmin} />
        </Switch>
      </div>
    </div>
  </Router>
);

export { App };
