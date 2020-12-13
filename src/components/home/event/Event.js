import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { hasEditAcces } from 'Helpers';
import { EventModal, RequestsTable } from './components';

const Event = ({
  event: { annualLeave, end, holidayRequests, id, start, style, userId },
  title,
}) => {
  const [show, setShow] = useState(false);
  const { user } = useSelector(state => state.authReducer);

  const handleShow = () => hasEditAcces(user, userId) && setShow(!show);

  const modalProps = {
    annualLeave,
    end,
    handleShow,
    id,
    show,
    start,
    title,
    update: true,
  };

  const banner = (
    <div onClick={handleShow} style={style}>
      <strong> {title} </strong>
    </div>
  );

  const noAuthToolTip = (
    <Popover.Title as="h3">
      Only owners and managers can make update requests.
    </Popover.Title>
  );

  const withTooltip = (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="top"
      overlay={
        <Popover id={`hol-${id}-popover`}>
          <Popover.Content>
            {hasEditAcces(user, userId) ? (
              <>
                <Popover.Title as="h3">Pending Requests</Popover.Title>
                <RequestsTable requests={holidayRequests} />
              </>
            ) : (
              noAuthToolTip
            )}
          </Popover.Content>
        </Popover>
      }
    >
      {banner}
    </OverlayTrigger>
  );

  return (
    <>
      {holidayRequests ? withTooltip : banner}
      <EventModal {...modalProps} />
    </>
  );
};

export { Event };
