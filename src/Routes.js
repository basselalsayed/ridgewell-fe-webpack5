import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Register,
  Home,
  Profile,
  BoardUser,
  BoardAdmin,
  PrivateRoute,
} from 'components';

export const Routes = () => (
  <Switch>
    <PrivateRoute exact path={['/', '/home']} component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute path="/user" component={BoardUser} />
    <PrivateRoute path="/admin" component={BoardAdmin} />
  </Switch>
);
