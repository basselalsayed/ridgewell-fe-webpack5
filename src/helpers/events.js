import { colors } from '../constants';

const filterRequests = (type, reqs) =>
  reqs ? reqs.filter((req) => type.test(req.type)) : [];

const hasPending = (type, reqs) => filterRequests(type, reqs).length > 0;

const eventStyleGetter = (
  { confirmed, HolidayRequests },
  start,
  end,
  isSelected
) => ({
  style: {
    backgroundColor: hasPending(/delete/, HolidayRequests)
      ? colors.hasDelete
      : hasPending(/update/, HolidayRequests)
      ? colors.hasUpdate
      : confirmed
      ? colors.confirmed
      : colors.notConfirmed,
    borderRadius: '5px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block',
    padding: '1em',
  },
});

const requestHandler = (holReqs) =>
  filterRequests(/update/, holReqs).map(({ type, from, resolved, until }) => ({
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
      HolidayRequests,
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

const requestEventsOld = (holidays) => {
  let array = [];

  holidays.forEach(
    ({ holidayRequests }) =>
      (array = [...array, ...requestHandler(holidayRequests)])
  );
  return array;
};

const requestEvents = (holidays) =>
  holidays.reduce(
    (events, { HolidayRequests }) =>
      events.concat(requestHandler(HolidayRequests)),
    []
  );

export { eventStyleGetter, holidayEvents, requestHandler, requestEvents };
