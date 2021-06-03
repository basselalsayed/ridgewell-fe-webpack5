import { memo, useMemo } from 'react';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap';

import { Holidays, Notifications, Requests } from 'components';
import { useAuth, useAutoEffect, useHolidays, useRequests } from 'hooks';

import { useHistory, useLocation } from 'react-router';
import './Board.scss';
import 'components/skeletons/skeleton.scss';

const BoardUser = memo(() => {
  const {
    holidays,
    loadingHolidays,
    loadedHolidays,
    requests,
    loadingRequests,
    loadedRequests,
  } = useAuth();

  const history = useHistory();
  const { hash } = useLocation();

  useAutoEffect({
    condition: hash === '',
    callback: () => history.push('#requests'),
    deps: [],
  });

  const { getHolidayEntities } = useHolidays();
  const { getRequestEntities } = useRequests();

  const ownHolidayEntities = useMemo(
    () => (loadedHolidays && holidays && getHolidayEntities(holidays)) || [],
    [loadedHolidays, holidays]
  );
  const ownRequestEntities = useMemo(
    () => (loadedRequests && requests && getRequestEntities(requests)) || [],
    [loadedRequests, requests]
  );

  //  <div className='container'>
  // <header className='jumbotron'>

  const tabButtons = (
    <Row>
      <Col>
        <ListGroup horizontal>
          <ListGroup.Item
            action
            active={hash === '#requests'}
            onClick={() => history.push('#requests')}
          >
            Requests
          </ListGroup.Item>

          <ListGroup.Item
            action
            active={hash === '#holidays'}
            onClick={() => history.push('#holidays')}
          >
            Holidays
          </ListGroup.Item>

          <ListGroup.Item
            action
            active={hash === '#notifications'}
            onClick={() => history.push('#notifications')}
          >
            Notifications
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
  const tabContent = (
    <Row>
      <Col>
        <Tab.Content>
          {hash === '#requests' && (
            <Requests
              requests={ownRequestEntities}
              loading={loadingRequests}
              loaded={loadedRequests}
            />
          )}
          {hash === '#holidays' && (
            <Holidays
              holidays={ownHolidayEntities}
              loading={loadingHolidays}
              loaded={loadedHolidays}
            />
          )}
          {hash === '#notifications' && <Notifications />}
        </Tab.Content>
      </Col>
    </Row>
  );

  return (
    <Tab.Container id="user-dash" defaultActiveKey="#requests">
      {tabButtons}
      {tabContent}
    </Tab.Container>

    //   {/* </header> */}
    // {/* </div> */}
  );
});

export { BoardUser };
