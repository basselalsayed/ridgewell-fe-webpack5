import { colors } from '../constants';

const filterRequests = (type, reqs) =>
  reqs ? reqs.filter(hol => hol.type === type) : [];

const hasPending = (type, reqs) => filterRequests(type, reqs).length;

const eventStyleGetter = (
  { confirmed, holidayRequests },
  start,
  end,
  isSelected,
) => {
  let style = {
    backgroundColor: hasPending('delete', holidayRequests)
      ? colors.hasDelete
      : hasPending('update', holidayRequests)
      ? colors.hasUpdate
      : confirmed
      ? colors.confirmed
      : colors.notConfirmed,
    borderRadius: '5px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block',
  };
  return {
    style,
  };
};

const requestHandler = holReqs =>
  filterRequests('update', holReqs).map(({ type, from, resolved, until }) => ({
    title: `${type}, Resolved: ${resolved}`,
    start: from && new Date(from),
    end: until && new Date(until),
    resolved,
  }));

const holidayEvents = holidays =>
  holidays.map(
    ({
      annualLeave,
      confirmed,
      from,
      HolidayRequests,
      id,
      until,
      User: { id: userId, username },
    }) => ({
      annualLeave,
      confirmed,
      holidayRequests: HolidayRequests,
      id,
      userId,
      get title() {
        return annualLeave
          ? username + ': Annual Leave'
          : username + ': Sick Leave';
      },
      start: new Date(from),
      end: new Date(until),
      // style: { backgroundColor: 'orange' },
    }),
  );

const requestEvents = holidays => {
  let array = [];

  holidays.forEach(
    ({ holidayRequests }) =>
      (array = [...array, ...requestHandler(holidayRequests)]),
  );
  return array;
};

export { eventStyleGetter, holidayEvents, requestEvents };
