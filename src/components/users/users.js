import UniversalComponent from 'components/UniversalComponent';
import { useAuth, useUsers } from 'hooks';
import { memo, useEffect } from 'react';

import { getUsers } from 'store/modules';

const Users = memo(() => {
  const { loading, loaded, userEntities } = useUsers();
  const { isAdmin, loggedIn } = useAuth();

  useEffect(() => {
    if (loggedIn && isAdmin && !loading && !loaded) getUsers();
  }, [getUsers, isAdmin, loading, loaded]);

  return (
    <UniversalComponent
      export="BoardDisplay"
      content={userEntities}
      componentExport="User"
      loading={loading}
      loaded={loaded}
      emptyMessage="No users to display"
    />
  );
});

export { Users };
