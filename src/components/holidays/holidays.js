import UniversalComponent from 'components/UniversalComponent';

import { memo } from 'react';

const Holidays = memo(({ holidays, loading, loaded }) => (
  <UniversalComponent
    export="BoardDisplay"
    content={holidays}
    componentExport="Holiday"
    loading={loading}
    loaded={loaded}
    emptyMessage="No holidays here"
  />
));

export { Holidays };
