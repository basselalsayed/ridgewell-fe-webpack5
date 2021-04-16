import { colors } from '../constants';

const filterRequests = (type, reqs) =>
  reqs ? reqs.filter((req) => req.type === type) : [];

const hasPending = (type, reqs) => filterRequests(type, reqs).length > 0;

const eventStyleGetter = (
  { confirmed, holidayRequests },
  start,
  end,
  isSelected
) => ({
  style: {
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
  },
});

const requestHandler = (holReqs) =>
  filterRequests('update', holReqs).map(({ type, from, resolved, until }) => ({
    title: `${type}, Resolved: ${resolved}`,
    start: from && new Date(from),
    end: until && new Date(until),
    resolved,
  }));

const holidayEvents = (holidays) =>
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
          ? `${username}: Annual Leave`
          : `${username}: Sick Leave`;
      },
      start: new Date(from),
      end: new Date(until),
      // style: { backgroundColor: 'orange' },
    })
  );

const requestEvents3 = (holidays) => {
  let array = [];

  holidays.forEach(
    ({ holidayRequests }) =>
      (array = [...array, ...requestHandler(holidayRequests)])
  );
  return array;
};

const requestEvents = (holidays) => {
  const array = holidays.reduce(
    (events, { holidayRequests }) =>
      events.concat(requestHandler(holidayRequests)),
    []
  );

  let array2 = [];
  holidays.forEach(
    ({ holidayRequests }) =>
      (array2 = [...array2, ...requestHandler(holidayRequests)])
  );

  return array;
};

export { eventStyleGetter, holidayEvents, requestEvents };
