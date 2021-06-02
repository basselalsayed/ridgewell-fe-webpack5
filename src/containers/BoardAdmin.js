import { Tab, Row, Col, ListGroup } from 'react-bootstrap';
import { Holidays, Requests, Users } from 'components';

import './Board.scss';
import 'components/skeletons/skeleton.scss';

const BoardAdmin = () => {
  //  <div className='container'>
  // <header className='jumbotron'>
  const tabButtons = (
    <Row>
      <Col>
        <ListGroup horizontal>
          <ListGroup.Item action className="tabBtn" href="#requests">
            Requests
          </ListGroup.Item>

          <ListGroup.Item action className="tabBtn" href="#users">
            Users
          </ListGroup.Item>

          <ListGroup.Item action className="tabBtn" href="#holidays">
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
          <Tab.Pane eventKey="#requests">
            <Requests />
          </Tab.Pane>
          <Tab.Pane eventKey="#users">
            <Users />
          </Tab.Pane>
          <Tab.Pane eventKey="#holidays">
            <Holidays />
          </Tab.Pane>
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
