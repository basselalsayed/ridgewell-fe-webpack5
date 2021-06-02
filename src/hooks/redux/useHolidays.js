import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { holidayEvents, requestEvents } from 'helpers';
import {
  getUserHolidays as _getUserHolidays,
  getAllHolidays as _getAllHolidays,
} from 'store/modules';

import { useAdmin, useAuth, useEntities } from 'hooks';
import { useLocation } from 'react-router';

const useHolidays = () => {
  const {
    holidays: { holidays, loaded, loading },
  } = useSelector((state) => state.content, shallowEqual);

  const { pathname } = useLocation();

  const { isOnUserPage, loggedIn } = useAuth();

  const dispatch = useDispatch();

  const { defaultArgs } = useAdmin();

  const getUserHolidays = useCallback(
    (userId) => dispatch(_getUserHolidays(userId)),
    [defaultArgs, loggedIn]
  );

  const getAllHolidays = useCallback(() => dispatch(_getAllHolidays()));

  useEffect(() => {
    if (
      loggedIn &&
      !isOnUserPage &&
      ['/', '/admin', '/home'].includes(pathname)
    ) {
      if (!loading && !loaded) getAllHolidays();
    }
  }, [loggedIn, isOnUserPage, pathname, loading, loaded]);

  const { entities, getDenormalizedEntity } = useEntities();

  const getHolidayEntities = useCallback((input) =>
    getDenormalizedEntity('holidays', input)
  );

  const allHolidayIds = useMemo(() => Object.keys(entities.holidays), [
    entities.holidays,
  ]);

  const allHolidayEntities = useMemo(() => getHolidayEntities(allHolidayIds), [
    allHolidayIds,
  ]);

  const events = useMemo(
    () =>
      allHolidayEntities
        ? [
            ...holidayEvents(allHolidayEntities),
            ...requestEvents(allHolidayEntities),
          ]
        : [],
    [allHolidayEntities]
  );

  return {
    allHolidayEntities,
    events,
    getHolidayEntities,
    getUserHolidays,
    getAllHolidays,
    holidays,
    loaded,
    loading,
  };
};

export { useHolidays };
