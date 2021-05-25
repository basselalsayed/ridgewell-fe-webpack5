import UniversalComponent from 'components/UniversalComponent';
import { memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const Users = memo(() => {
  const {
    users: { loading, users },
  } = useSelector((state) => state.content, shallowEqual);

  return (
    <UniversalComponent
      export="BoardDisplay"
      content={users}
      componentExport="User"
      loading={loading}
      emptyMessage="No users to display"
    />
  );
});

export { Users };
