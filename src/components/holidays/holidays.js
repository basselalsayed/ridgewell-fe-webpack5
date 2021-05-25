import UniversalComponent from 'components/UniversalComponent';
import { useHolidays } from 'hooks';
import { memo } from 'react';

const Holidays = memo(() => {
  const { holidays, loading } = useHolidays();

  return (
    <UniversalComponent
      export="BoardDisplay"
      content={holidays}
      componentExport="Holiday"
      loading={loading}
      emptyMessage="No holidays here"
    />
  );
});

export { Holidays };
