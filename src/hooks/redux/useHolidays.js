import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { holidayEvents, requestHandler } from 'helpers';
import {
  getUserHolidays as _getUserHolidays,
  getAllHolidays as _getAllHolidays,
} from 'store/modules';

import { useAdmin, useAuth, useEntities } from 'hooks';
import { useRequests } from './useRequests';

const useHolidays = () => {
  const {
    holidays: { holidays, loaded, loading },
  } = useSelector((state) => state.content, shallowEqual);

  const { loggedIn } = useAuth();

  const dispatch = useDispatch();

  const { defaultArgs, shouldFetchAll } = useAdmin();

  const getUserHolidays = useCallback(
    (userId) => dispatch(_getUserHolidays(userId)),
    [defaultArgs, loggedIn]
  );

  const getAllHolidays = useCallback(() => dispatch(_getAllHolidays()));

  useEffect(() => {
    if (loggedIn && shouldFetchAll) {
      if (!loading && !loaded) getAllHolidays();
    }
  }, [loggedIn, shouldFetchAll, loading, loaded]);

  const { entities, getDenormalizedEntity } = useEntities();

  const getHolidayEntities = useCallback((input) =>
    getDenormalizedEntity('holidays', input)
  );

  const allHolidayIds = useMemo(() => Object.keys(entities.holidays), [
    entities.holidays,
  ]);

  const allHolidayEntities = useMemo(
    () => (loaded ? getHolidayEntities(allHolidayIds) : []),
    [allHolidayIds, loaded]
  );

  const { allRequestEntities } = useRequests();

  const events = useMemo(
    () =>
      (allHolidayEntities.length > 0 &&
        holidayEvents(allHolidayEntities).concat(
          requestHandler(allRequestEntities)
        )) ||
      [],
    [allHolidayEntities, allRequestEntities]
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
