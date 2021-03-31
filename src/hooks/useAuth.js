import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login, signUp, logOut } from 'store/actions/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector(
    (state) => state.authReducer,
    shallowEqual
  );

  const _login = useCallback(async (userInfo) => dispatch(login(userInfo)), [
    dispatch,
  ]);

  const _signUp = useCallback((userInfo) => dispatch(signUp(userInfo)), [
    dispatch,
  ]);

  const _logOut = useCallback(() => dispatch(logOut()), [dispatch]);

  // const loggedIn = useMemo(() => !!user, [user]);

  return {
    login: _login,
    logOut: _logOut,
    loggedIn,
    signUp: _signUp,
    user,
  };
};

export { useAuth };
