import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from './redux';

const useAdmin = () => {
  const { pathname } = useLocation();

  const {
    user: { id },
  } = useAuth();

  const shouldFetchAll = useMemo(() => !/user/.test(pathname), [pathname]);

  const defaultArgs = useMemo(() => (shouldFetchAll ? null : id), [
    shouldFetchAll,
  ]);

  return {
    defaultArgs,
    shouldFetchAll,
  };
};

export { useAdmin };
