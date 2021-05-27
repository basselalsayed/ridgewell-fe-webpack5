import UniversalComponent from 'components/UniversalComponent';
import { useAuth } from 'hooks';
import { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'store/modules';

const Users = memo(() => {
  const dispatch = useDispatch();
  const {
    users: { loading, loaded, users },
  } = useSelector((state) => state.content, shallowEqual);

  const { loggedIn } = useAuth();

  useEffect(() => {
    if (loggedIn && !loading && !loading) dispatch(getUsers());
  }, [dispatch]);

  return (
    <UniversalComponent
      export="BoardDisplay"
      content={users}
      componentExport="User"
      loading={loading}
      loaded={loaded}
      emptyMessage="No users to display"
    />
  );
});

export { Users };
