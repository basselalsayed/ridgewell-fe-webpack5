import UniversalComponent from 'components/UniversalComponent';
import { useHolidays } from 'hooks';

const Holidays = () => {
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
};
export { Holidays };
