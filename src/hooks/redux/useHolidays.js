import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { holidayEvents, requestEvents } from 'helpers';
import {
  getUserHolidays as _getUserHolidays,
  getAllHolidays as _getAllHolidays,
} from 'store/modules';

import { useAdmin, useAuth } from 'hooks';

const useHolidays = () => {
  const {
    holidays: { holidays, loaded, loading },
  } = useSelector((state) => state.content, shallowEqual);

  const { isAdmin, loggedIn } = useAuth();
  const dispatch = useDispatch();

  const { defaultArgs } = useAdmin();

  const getHolidays = useCallback(
    (userId = defaultArgs) => dispatch(_getHolidays(userId)),
    [defaultArgs, loggedIn]
  );

  const getUserHolidays = useCallback(
    (userId) => dispatch(_getUserHolidays(userId)),
    [defaultArgs, loggedIn]
  );
  const getAllHolidays = useCallback(
    () => isAdmin && dispatch(_getAllHolidays()),
    [loggedIn, isAdmin]
  );

  useEffect(() => {
    return loggedIn && !loading && !loaded
      ? defaultArgs
        ? getUserHolidays(defaultArgs)
        : getAllHolidays()
      : null;
  }, [dispatch, loggedIn]);

  const events = useMemo(
    () =>
      holidays ? [...holidayEvents(holidays), ...requestEvents(holidays)] : [],
    [holidays]
  );

  return {
    events,
    getUserHolidays,
    getAllHolidays,
    holidays,
    loaded,
    loading,
  };
};

export { useHolidays };
