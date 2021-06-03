import { useCallback, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getUsers as _getUsers } from 'store/modules';
import { useAuth, useAutoEffect, useEntities } from 'hooks';

const useUsers = () => {
  const dispatch = useDispatch();
  const { isAdmin, loggedIn } = useAuth();
  const { pathname } = useLocation();

  const { loading, loaded } = useSelector(
    ({ content: { users } }) => users,
    shallowEqual
  );

  const getUsers = useCallback(() => dispatch(_getUsers()));

  useAutoEffect({
    condition:
      loggedIn && isAdmin && /admin/.test(pathname) && !loading && !loaded,
    callback: getUsers,
    deps: [isAdmin, loggedIn, pathname, loading, loaded],
  });

  const { entities, getDenormalizedEntity } = useEntities();

  const getUserEntities = useCallback((input) =>
    getDenormalizedEntity('users', input)
  );

  const allUserIds = useMemo(() => Object.keys(entities.users), [
    entities.users,
  ]);

  const allUserEntities = useMemo(
    () => (loaded && getUserEntities(allUserIds)) || [],
    [allUserIds, loaded]
  );

  return {
    getUsers,
    loading,
    loaded,
    userEntities: allUserEntities,
  };
};

export { useUsers };
