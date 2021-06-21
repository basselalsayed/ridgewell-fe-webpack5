import { BoardDisplay } from 'components';
// import UniversalComponent from 'components/UniversalComponent';

import { memo } from 'react';

const Holidays = memo(({ holidays, loading, loaded }) => (
  <BoardDisplay
    // export="BoardDisplay"
    content={holidays}
    componentExport="Holiday"
    componentPath="holidays/holiday"
    loading={loading}
    loaded={loaded}
    emptyMessage="No holidays here"
  />
));

export default Holidays;
