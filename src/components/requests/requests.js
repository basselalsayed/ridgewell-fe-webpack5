import { BoardDisplay } from 'components';
// import UniversalComponent from 'components/UniversalComponent';
import { memo } from 'react';

const Requests = memo(({ requests, loaded, loading }) => (
  <BoardDisplay
    // export="BoardDisplay"
    content={requests}
    componentPath="requests/request"
    loading={loading}
    loaded={loaded}
    emptyMessage="No requests awaiting approval"
  />
));

export default Requests;
