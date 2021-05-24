import { useAdmin, useAuth } from 'hooks';
import { useCallback, useEffect } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import {
  getRequests as _getRequests,
  postDeleteRequest as _postDeleteRequest,
  postNewRequest as _postNewRequest,
  postUpdateRequest as _postUpdateRequest,
  confirmRequest as _confirmRequest,
  denyRequest as _denyRequest,
} from 'store/modules';

const useRequests = () => {
  const { loggedIn } = useAuth();

  const dispatch = useDispatch();

  const { defaultArgs } = useAdmin();

  const { requests, loaded, loading } = useSelector(
    (state) => state.requests,
    shallowEqual
  );

  const getRequests = useCallback(
    (userId = defaultArgs) => dispatch(_getRequests(userId)),
    [defaultArgs, loggedIn]
  );

  // const getAllRequests = useCallback(() => dispatch(_getRequests()), []);

  // const getUserRequests = useCallback(
  //   (userId) => dispatch(_getRequests(userId)),
  //   [defaultArgs, loggedIn]
  // );

  useEffect(() => {
    if (loggedIn && !loading && !loaded) getRequests();
  }, [dispatch, loggedIn]);

  const postDeleteRequest = useCallback(
    (holidayId, setStatus) =>
      dispatch(_postDeleteRequest(holidayId, setStatus)),
    [loggedIn]
  );

  const postNewRequest = useCallback(
    (formData, setStatus) => dispatch(_postNewRequest(formData, setStatus)),
    [loggedIn]
  );

  const postUpdateRequest = useCallback(
    (formData, setStatus) => dispatch(_postUpdateRequest(formData, setStatus)),
    [loggedIn]
  );

  const confirmRequest = useCallback(
    (requestId, setStatus) => dispatch(_confirmRequest(requestId, setStatus)),
    [loggedIn]
  );

  const denyRequest = useCallback(
    (requestId, setStatus) => dispatch(_denyRequest(requestId, setStatus)),
    [loggedIn]
  );

  return {
    confirmRequest,
    denyRequest,
    // getAllRequests,
    getRequests,
    // getUserRequests,
    loaded,
    loading,
    postDeleteRequest,
    postNewRequest,
    postUpdateRequest,
    requests,
  };
};

export { useRequests };
