import { useRequests } from 'hooks/redux/useRequests';

import UniversalComponent from 'components/UniversalComponent';

const Requests = () => {
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
};

export { Requests };
