import { useRequests } from 'hooks';

import UniversalComponent from 'components/UniversalComponent';
import { memo } from 'react';

const Requests = memo(() => {
  const { requests, loading } = useRequests();

  return (
    <UniversalComponent
      export="BoardDisplay"
      content={requests}
      componentExport="Request"
      loading={loading}
      emptyMessage="No requests awaiting approval"
    />
  );
});

export { Requests };
