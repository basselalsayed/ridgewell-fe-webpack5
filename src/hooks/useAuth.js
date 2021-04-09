import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, signUp, logOut } from 'store/actions/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector((state) => state.auth, shallowEqual);
  const history = useHistory();
  const _login = useCallback(async (userInfo) => dispatch(login(userInfo)), [
    dispatch,
  ]);

  const _signUp = useCallback((userInfo) => dispatch(signUp(userInfo)), [
    dispatch,
  ]);

  const _logOut = useCallback(() => (dispatch(logOut()), history.push('/')), [
    dispatch,
  ]);

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
