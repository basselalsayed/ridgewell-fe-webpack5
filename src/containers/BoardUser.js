import { memo, useEffect } from 'react';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAll } from 'store/modules';
import { setError } from 'store/modules/response';
import { Holidays, Notifications, Requests } from 'components';
import { useAuth } from 'hooks';
import { tabBtn } from 'components/index.module.css';

const BoardUser = memo(() => {
  const { loggedIn, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () =>
      loggedIn
        ? dispatch(getAll(user.id))
        : dispatch(setError('No User logged in'));

    getData();
  }, [dispatch, loggedIn, user.id]);

  const { notifications } = useSelector((state) => state.content, shallowEqual);

  //  <div className='container'>
  // <header className='jumbotron'>
  const tabButtons = (
    <Row>
      <Col>
        <ListGroup horizontal>
          <ListGroup.Item action className={tabBtn} href="#requests">
            Requests
          </ListGroup.Item>

          <ListGroup.Item action className={tabBtn} href="#holidays">
            Holidays
          </ListGroup.Item>

          <ListGroup.Item action className={tabBtn} href="#notifications">
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
          <Tab.Pane eventKey="#requests">
            <Requests />
          </Tab.Pane>
          <Tab.Pane eventKey="#holidays">
            <Holidays />
          </Tab.Pane>
          <Tab.Pane eventKey="#notifications">
            <Notifications notifications={notifications} />
          </Tab.Pane>
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
