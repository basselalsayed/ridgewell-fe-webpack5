import { isAdmin as isAdminHelper } from 'helpers';
import { useCallback, useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import {
  login as _login,
  signUp as _signUp,
  logOut as _logOut,
  getOwnHolidays as _getOwnHolidays,
  getOwnRequests as _getOwnRequests,
} from 'store/modules';

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

  const useUserAutoEffect = ({ deps, condition, callback }) =>
    useEffect(() => {
      if (condition) callback();
    }, deps);

  useUserAutoEffect({
    deps: [loggedIn, isOnUserPage, loadingHolidays, loadedHolidays],
    condition: loggedIn && isOnUserPage && !loadingHolidays && !loadedHolidays,
    callback: getOwnRequests,
  });
  useUserAutoEffect({
    deps: [loggedIn, isOnUserPage, loadingRequests, loadedRequests],
    condition: loggedIn && isOnUserPage && !loadingRequests && !loadedRequests,
    callback: getOwnHolidays,
  });

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
    login,
    logOut,
    loggedIn,
    requests,
    signUp,
    user,
  };
};

export { useAuth };
