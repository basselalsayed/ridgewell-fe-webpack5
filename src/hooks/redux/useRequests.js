import { useCallback, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  getRequests as _getRequests,
  postDeleteRequest as _postDeleteRequest,
  postNewRequest as _postNewRequest,
  postUpdateRequest as _postUpdateRequest,
} from 'store/modules';
import { useAuth } from './useAuth';

const useRequests = () => {
  const { requests, loaded, loading } = useSelector(
    (state) => state.requests,
    shallowEqual
  );

  const { loggedIn } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn && !loading && !loaded) _getRequests();
  }, [dispatch, loggedIn]);

  const getRequests = useCallback((userId) => dispatch(_getRequests(userId)), [
    loggedIn,
  ]);

  const postDeleteRequest = useCallback(
    (id, setStatus) => dispatch(_postDeleteRequest(id, setStatus)),
    [loggedIn]
  );

  const postNewRequest = useCallback(
    (id, setStatus) => dispatch(_postNewRequest(id, setStatus)),
    [loggedIn]
  );

  const postUpdateRequest = useCallback(
    (id, setStatus) => dispatch(_postUpdateRequest(id, setStatus)),
    [loggedIn]
  );

  return {
    getRequests,
    loaded,
    loading,
    postDeleteRequest,
    postNewRequest,
    postUpdateRequest,
    requests,
  };
};

export { useRequests };
