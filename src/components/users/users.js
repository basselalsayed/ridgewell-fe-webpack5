import { memo } from 'react';
// import UniversalComponent from 'components/UniversalComponent';
import { useUsers } from 'hooks';
import { BoardDisplay } from 'components';

const Users = memo(() => {
  const { loading, loaded, userEntities } = useUsers();

  return (
    <BoardDisplay
      // export="BoardDisplay"
      content={userEntities}
      componentPath="users/user"
      loading={loading}
      loaded={loaded}
      emptyMessage="No users to display"
    />
  );
});

export default Users;
