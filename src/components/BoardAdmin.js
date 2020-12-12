import { useEffect } from 'react';

import { Tab, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Holidays, Requests, Users } from ".";


import { tabBtn } from './index.module.css';
import { getAll } from '../store/actions';

const BoardAdmin = () => {
  const dispatch = useDispatch();

  const { holidays, requests, users } = useSelector(
    state => state.contentReducer,
  );

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  //  <div className='container'>
  // <header className='jumbotron'>
  const tabButtons = (
    <Row>
      <Col>
        <ListGroup horizontal>
          <ListGroup.Item
            action
            className={tabBtn}
            href='#requests'
            children='Requests'
          />
          <ListGroup.Item
            action
            className={tabBtn}
            href='#users'
            children='Users'
          />

          <ListGroup.Item
            action
            className={tabBtn}
            href='#holidays'
            children='Holidays'
          />
        </ListGroup>
      </Col>
    </Row>
  );

  const tabContent = (
    <Row>
      <Col>
        {holidays && requests && users ? (
          <Tab.Content>
            <Tab.Pane eventKey='#requests'>
              <Requests requests={requests} />
            </Tab.Pane>
            <Tab.Pane eventKey='#users'>
              <Users users={users} />
            </Tab.Pane>
            <Tab.Pane eventKey='#holidays'>
              <Holidays holidays={holidays} />
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
            animation='border'
          />
        )}
      </Col>
    </Row>
  );

  return (
    <Tab.Container id='admin-dash' defaultActiveKey='#requests'>
      {tabButtons}
      {tabContent}
    </Tab.Container>

    //   {/* </header> */}
    // {/* </div> */}
  );
};

export { BoardAdmin };
