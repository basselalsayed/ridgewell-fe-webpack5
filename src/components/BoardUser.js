import { useEffect } from 'react';

import { Tab, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, setError } from 'Actions';
import { Holidays, Notifications, Requests } from 'Components';

import { tabBtn } from './index.module.css';
import { useSession } from './hooks';

const BoardUser = () => {
  const { error } = useSelector(state => state.responseReducer);
  const { loggedIn, user } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () =>
      loggedIn
        ? dispatch(getAll(user.id))
        : dispatch(setError('No User logged in'));

    getData();
  }, [dispatch, loggedIn, user.id]);

  const { holidays, notifications, requests } = useSelector(
    state => state.contentReducer
  );

  //  <div className='container'>
  // <header className='jumbotron'>
  const tabButtons = (
    <Row>
      <Col>
        <ListGroup horizontal>
          <ListGroup.Item
            action
            className={tabBtn}
            href="#requests"
            children="Requests"
          />
          <ListGroup.Item
            action
            className={tabBtn}
            href="#holidays"
            children="Holidays"
          />
          <ListGroup.Item
            action
            className={tabBtn}
            href="#notifications"
            children="Notifications"
          />
        </ListGroup>
      </Col>
    </Row>
  );

  const tabContent = (
    <Row>
      <Col>
        {error ? null : holidays && requests && notifications ? (
          <Tab.Content>
            <Tab.Pane eventKey="#requests">
              <Requests requests={requests} />
            </Tab.Pane>
            <Tab.Pane eventKey="#holidays">
              <Holidays holidays={holidays} />
            </Tab.Pane>
            <Tab.Pane eventKey="#notifications">
              <Notifications notifications={notifications} />
            </Tab.Pane>
          </Tab.Content>
        ) : (
          <Spinner
            style={{
              position: 'inherit',
              color: 'green',
              left: '50%',
              top: '50%',
              marginLeft: '-1rem',
              marginTop: '1rem',
            }}
            animation="border"
          />
        )}
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
};

export { BoardUser };
