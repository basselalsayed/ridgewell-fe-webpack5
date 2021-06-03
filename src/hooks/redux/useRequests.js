import { useAdmin, useAutoEffect, useAuth } from 'hooks';

import { useCallback, useMemo } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import {
  getAllRequests as _getAllRequests,
  getUserRequests as _getUserRequests,
  postDeleteRequest as _postDeleteRequest,
  postNewRequest as _postNewRequest,
  postUpdateRequest as _postUpdateRequest,
  confirmRequest as _confirmRequest,
  denyRequest as _denyRequest,
} from 'store/modules';
import { useEntities } from './useEntities';

const useRequests = () => {
  const { requests, loaded, loading } = useSelector(
    (state) => state.requests,
    shallowEqual
  );
  const { loggedIn } = useAuth();

  const dispatch = useDispatch();

  const { shouldFetchAll } = useAdmin();

  const getUserRequests = useCallback((userId) =>
    dispatch(_getUserRequests(userId))
  );

  const getAllRequests = useCallback(() => dispatch(_getAllRequests()));

  useAutoEffect({
    condition: loggedIn && shouldFetchAll && !loading && !loaded,
    callback: getAllRequests,
    deps: [loggedIn, shouldFetchAll, loading, loaded],
  });

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

  const { entities, getDenormalizedEntity } = useEntities();

  const getRequestEntities = useCallback((input) =>
    getDenormalizedEntity('holidayRequests', input)
  );

  const allRequestIds = useMemo(() => Object.keys(entities.holidayRequests), [
    entities.holidayRequests,
  ]);

  const allRequestEntities = useMemo(
    () => (loaded && getRequestEntities(allRequestIds)) || [],
    [allRequestIds, loaded]
  );

  return {
    allRequestEntities,
    confirmRequest,
    denyRequest,
    getRequestEntities,
    getAllRequests,
    getUserRequests,
    loaded,
    loading,
    postDeleteRequest,
    postNewRequest,
    postUpdateRequest,
    requests,
  };
};

export { useRequests };
