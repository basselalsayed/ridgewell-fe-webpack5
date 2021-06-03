import { Tab, Row, Col, ListGroup } from 'react-bootstrap';
import { Holidays, Requests, Users } from 'components';

import './Board.scss';
import 'components/skeletons/skeleton.scss';
import { useHistory, useLocation } from 'react-router';
import { useAutoEffect, useHolidays, useRequests } from 'hooks';

const BoardAdmin = () => {
  //  <div className='container'>
  // <header className='jumbotron'>

  const history = useHistory();
  const { hash } = useLocation();

  useAutoEffect({
    condition: hash === '',
    callback: () => history.push('#requests'),
    deps: [],
  });

  const {
    allHolidayEntities,
    loading: holidaysLoading,
    loaded: holidaysLoaded,
  } = useHolidays();
  const {
    allRequestEntities,
    loaded: requestsLoaded,
    loading: requestsLoading,
  } = useRequests();

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
            active={hash === '#users'}
            onClick={() => history.push('#users')}
          >
            Users
          </ListGroup.Item>

          <ListGroup.Item
            action
            active={hash === '#holidays'}
            onClick={() => history.push('#holidays')}
          >
            Holidays
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
              requests={allRequestEntities}
              loading={requestsLoading}
              loaded={requestsLoaded}
            />
          )}

          {hash === '#users' && <Users />}

          {hash === '#holidays' && (
            <Holidays
              holidays={allHolidayEntities}
              loading={holidaysLoading}
              loaded={holidaysLoaded}
            />
          )}
        </Tab.Content>
      </Col>
    </Row>
  );

  return (
    <Tab.Container id="admin-dash" defaultActiveKey="#requests">
      {tabButtons}
      {tabContent}
    </Tab.Container>

    //   {/* </header> */}
    // {/* </div> */}
  );
};

export { BoardAdmin };
export default BoardAdmin;
