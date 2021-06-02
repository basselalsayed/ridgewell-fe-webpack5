import { isAdmin as isAdminHelper } from 'helpers';
import { useCallback, useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import {
  login as _login,
  signUp as _signUp,
  logOut as _logOut,
  getOwnHolidays as _getOwnHolidays,
} from 'store/modules';
import { useHolidays } from './useHolidays';

const useAuth = () => {
  const dispatch = useDispatch();

  const { user, loadingHolidays, loadedHolidays, holidays } = useSelector(
    ({ auth }) => auth,
    shallowEqual
  );

  const loggedIn = useMemo(() => !!user, [user]);

  const history = useHistory();
  const { pathname } = useLocation();
  // const { getUserHolidays } = useHolidays();

  const login = useCallback(async (userInfo) => dispatch(_login(userInfo)), [
    dispatch,
  ]);

  const isOnUserPage = useMemo(() => /user/.test(pathname), [pathname]);

  const getOwnHolidays = useCallback(() => dispatch(_getOwnHolidays(user.id)));

  useEffect(() => {
    if (loggedIn && isOnUserPage && !loadingHolidays && !loadedHolidays) {
      getOwnHolidays();
    }
  }, [loggedIn, loadingHolidays, loadedHolidays, isOnUserPage]);

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
    login,
    logOut,
    loggedIn,
    signUp,
    user,
  };
};

export { useAuth };
