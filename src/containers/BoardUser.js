import { useEffect } from 'react';
import { Tab, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAll } from 'store/modules';
import { setError } from 'store/modules/response';
import { Holidays, Notifications, Requests } from 'components';
import { useAuth } from 'hooks';
import { tabBtn } from 'components/index.module.css';

const BoardUser = () => {
  const { error } = useSelector((state) => state.response, shallowEqual);
  const { loggedIn, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () =>
      loggedIn
        ? dispatch(getAll(user.id))
        : dispatch(setError('No User logged in'));

    getData();
  }, [dispatch, loggedIn, user.id]);

  const {
    holidays: { holidays },
    notifications,
    requests,
  } = useSelector((state) => state.content, shallowEqual);

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
