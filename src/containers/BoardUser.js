import { memo, useEffect, useMemo } from 'react';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';

import { Holidays, Notifications, Requests } from 'components';
import { useAuth, useHolidays } from 'hooks';

import { useHistory, useLocation } from 'react-router';
import './Board.scss';
import 'components/skeletons/skeleton.scss';

const BoardUser = memo(() => {
  const { holidays, loadingHolidays, loadedHolidays } = useAuth();

  const history = useHistory();
  const { hash } = useLocation();

  const { getHolidayEntities } = useHolidays();
  const { notifications } = useSelector((state) => state.content, shallowEqual);

  const ownHolidayEntities = useMemo(() => getHolidayEntities(holidays), [
    holidays,
  ]);
  //  <div className='container'>
  // <header className='jumbotron'>
  const tabButtons = (
    <Row style={{ justifyContent: 'center' }}>
      <ListGroup horizontal className="tabBtnContainer">
        <div
          className={`tabBtn ${hash === '#requests' ? 'active' : ''}`}
          onClick={() => history.push('#requests')}
        >
          Requests
        </div>

        <div
          className={`tabBtn ${hash === '#holidays' ? 'active' : ''}`}
          onClick={() => history.push('#holidays')}
        >
          Holidays
        </div>

        <div
          className={`tabBtn ${hash === '#notifications' ? 'active' : ''}`}
          onClick={() => history.push('#notifications')}
        >
          Notifications
        </div>
      </ListGroup>
    </Row>
  );

  const tabContent = (
    <Row>
      <Col>
        <Tab.Content>
          {hash === '#requests' && <Requests />}
          {hash === '#holidays' && (
            <Holidays
              allHolidayEntities={ownHolidayEntities}
              loading={loadingHolidays}
              loaded={loadedHolidays}
            />
          )}
          {hash === '#notifications' && (
            <Notifications notifications={notifications} />
          )}
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
