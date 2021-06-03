import { useCallback, useMemo } from 'react';
import { isAdmin as isAdminHelper } from 'helpers';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useAutoEffect } from 'hooks';

import {
  login as _login,
  signUp as _signUp,
  logOut as _logOut,
  getOwnHolidays as _getOwnHolidays,
  getOwnRequests as _getOwnRequests,
  getNotifications as _getNotifications,
} from 'store/modules';
import { useEntities } from './useEntities';

const useAuth = () => {
  const dispatch = useDispatch();

  const {
    user,
    loadingHolidays,
    loadedHolidays,
    holidays,
    loadingRequests,
    loadedRequests,
    requests,
    loadingNotifications,
    loadedNotifications,
    notifications,
  } = useSelector(({ auth }) => auth, shallowEqual);

  const loggedIn = useMemo(() => !!user, [user]);

  const history = useHistory();
  const { pathname } = useLocation();
  // const { getUserHolidays } = useHolidays();

  const login = useCallback(async (userInfo) => dispatch(_login(userInfo)), [
    dispatch,
  ]);

  const isOnUserPage = useMemo(() => /user/.test(pathname), [pathname]);

  const getOwnHolidays = useCallback(() => dispatch(_getOwnHolidays(user.id)));

  const getOwnRequests = useCallback(() => dispatch(_getOwnRequests(user.id)));

  const getNotifications = useCallback(() =>
    dispatch(_getNotifications(user.id))
  );

  useAutoEffect({
    deps: [loggedIn, loadingNotifications, loadedNotifications],
    condition: loggedIn && !loadingNotifications && !loadedNotifications,
    callback: getNotifications,
  });

  useAutoEffect({
    deps: [loggedIn, isOnUserPage, loadingHolidays, loadedHolidays],
    condition: loggedIn && isOnUserPage && !loadingHolidays && !loadedHolidays,
    callback: getOwnRequests,
  });

  useAutoEffect({
    deps: [loggedIn, isOnUserPage, loadingRequests, loadedRequests],
    condition: loggedIn && isOnUserPage && !loadingRequests && !loadedRequests,
    callback: getOwnHolidays,
  });

  const { getDenormalizedEntity } = useEntities();

  const notificationEntities = useMemo(
    () =>
      (loadedNotifications &&
        getDenormalizedEntity('notifications', notifications)) ||
      [],
    [loadedNotifications, notifications]
  );

  const signUp = useCallback((userInfo) => dispatch(_signUp(userInfo)), [
    dispatch,
  ]);

  const logOut = useCallback(() => (dispatch(_logOut()), history.push('/')), [
    dispatch,
  ]);

  const isAdmin = useMemo(() => (loggedIn ? isAdminHelper(user) : false), [
    loggedIn,
    user,
  ]);

  return {
    holidays,
    isAdmin,
    isOnUserPage,
    loadingHolidays,
    loadedHolidays,
    loadingRequests,
    loadedRequests,
    loadingNotifications,
    loadedNotifications,
    login,
    logOut,
    loggedIn,
    notifications,
    notificationEntities,
    requests,
    signUp,
    user,
  };
};

export { useAuth };
