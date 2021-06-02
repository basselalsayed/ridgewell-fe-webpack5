import UniversalComponent from 'components/UniversalComponent';
import { useHolidays } from 'hooks';
import { memo } from 'react';

const Holidays = memo(
  ({
    allHolidayEntities = useHolidays().allHolidayEntities,
    loading = useHolidays().loading,
    loaded = useHolidays().loaded,
  }) => (
    <UniversalComponent
      export="BoardDisplay"
      content={allHolidayEntities}
      componentExport="Holiday"
      loading={loading}
      loaded={loaded}
      emptyMessage="No holidays here"
    />
  )
);

export { Holidays };
