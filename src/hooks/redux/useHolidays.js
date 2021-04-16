import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { holidayEvents, requestEvents } from 'helpers';
import { getHolidays as _getHolidays } from 'store/modules';
import { useAuth } from './useAuth';

const useHolidays = () => {
  const {
    holidays: { holidays, loaded, loading },
  } = useSelector((state) => state.content, shallowEqual);

  const { loggedIn } = useAuth();
  const dispatch = useDispatch();

  const getHolidays = useCallback(
    (userId = null) => dispatch(_getHolidays(userId)),
    [loggedIn]
  );

  useEffect(() => {
    if (loggedIn && !loading && !loaded) getHolidays();
  }, [dispatch, loggedIn]);

  const events = useMemo(
    () => holidays && [...holidayEvents(holidays), ...requestEvents(holidays)],
    [holidays]
  );

  return {
    events,
    holidays,
    loaded,
    loading,
  };
};

export { useHolidays };
