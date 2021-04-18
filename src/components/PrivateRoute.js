import { Redirect, Route } from 'react-router-dom';
import { useAuth } from 'hooks';
import { isAdmin } from 'helpers';

export const ProtectedRoute = ({
  condition,
  component: Component,
  redirect,
  render,
  ...rest
}) => {
  if (!condition) return <Redirect to={redirect} />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export const PrivateRoute = ({ component, ...rest }) => {
  const { loggedIn } = useAuth();

  return (
    <ProtectedRoute
      condition={loggedIn}
      redirect="/login"
      component={component}
      {...rest}
    />
  );
};

export const AdminRoute = ({ component, ...rest }) => {
  const { loggedIn, user } = useAuth();
  return (
    <ProtectedRoute
      condition={isAdmin(user)}
      redirect={loggedIn ? '/user' : '/login'}
      component={component}
      {...rest}
    />
  );
};
