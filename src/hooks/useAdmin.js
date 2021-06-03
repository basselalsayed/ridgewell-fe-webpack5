import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from './redux';

const useAdmin = () => {
  const { pathname } = useLocation();

  const { loggedIn, user } = useAuth();

  const shouldFetchAll = useMemo(
    () => ['/', '/admin', '/home'].includes(pathname),
    [pathname]
  );

  const defaultArgs = useMemo(
    () => (shouldFetchAll || !loggedIn ? null : user.id),
    [loggedIn, user, shouldFetchAll]
  );

  return {
    defaultArgs,
    shouldFetchAll,
  };
};

export { useAdmin };
