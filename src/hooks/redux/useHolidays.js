import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { holidayEvents, requestEvents } from 'helpers';
import { getHolidays as _getHolidays } from 'store/modules';

import { useAdmin, useAuth } from 'hooks';

const useHolidays = () => {
  const {
    holidays: { holidays, loaded, loading },
  } = useSelector((state) => state.content, shallowEqual);

  const { loggedIn } = useAuth();
  const dispatch = useDispatch();

  const { defaultArgs } = useAdmin();

  const getHolidays = useCallback(
    (userId = defaultArgs) => dispatch(_getHolidays(userId)),
    [defaultArgs, loggedIn]
  );

  useEffect(() => {
    if (loggedIn && !loading && !loaded) getHolidays();
  }, [dispatch, loggedIn]);

  const events = useMemo(
    () =>
      holidays ? [...holidayEvents(holidays), ...requestEvents(holidays)] : [],
    [holidays]
  );

  return {
    events,
    getHolidays,
    holidays,
    loaded,
    loading,
  };
};

export { useHolidays };
