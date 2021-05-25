import { memo, useEffect, useState } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { eventStyleGetter } from 'helpers';
import { Event } from 'components/event';

import { useHolidays } from 'hooks';

import UniversalComponent from 'components/UniversalComponent';

const localizer = momentLocalizer(moment);

const Home = memo(() => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show, () => show && setDate(null));

  const { getHolidays, events } = useHolidays();

  useEffect(getHolidays, []);

  const handleSelect = ({ start, end }) => {
    setDate({ start, end });
    handleShow();
  };

  const modalProps = {
    ...date,
    annualLeave: false,
    handleShow,
    show,
    title: 'New Holiday',
    update: false,
  };

  return (
    <div>
      <Calendar
        selectable
        popup
        localizer={localizer}
        events={events}
        style={{ height: 800 }}
        onSelectSlot={handleSelect}
        components={{
          event: Event,
        }}
        eventPropGetter={eventStyleGetter}
        tooltipAccessor={null}
      />
      {date && (
        <UniversalComponent
          page="components/event/components"
          export="EventModal"
          {...modalProps}
        />
      )}
    </div>
  );
});
// <header className='jumbotron'>
// </header>

export { Home };
export default Home;
