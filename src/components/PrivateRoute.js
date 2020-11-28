import { Redirect, Route } from 'react-router-dom';
import { useSession } from './hooks';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useSession();
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};
