import UniversalComponent from 'components/UniversalComponent';
import { memo } from 'react';

const Requests = memo(({ requests, loaded, loading }) => (
  <UniversalComponent
    export="BoardDisplay"
    content={requests}
    componentExport="Request"
    loading={loading}
    loaded={loaded}
    emptyMessage="No requests awaiting approval"
  />
));

export { Requests };
