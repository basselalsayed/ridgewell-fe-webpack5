import { memo } from 'react';
import UniversalComponent from 'components/UniversalComponent';
import { useUsers } from 'hooks';

const Users = memo(() => {
  const { loading, loaded, userEntities } = useUsers();

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
