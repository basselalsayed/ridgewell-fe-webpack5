import { Modal, Col, Row } from 'react-bootstrap';

import { RequestForm } from '../../../.';
import { formatted } from '../../../../helpers';

import { useDispatch } from 'react-redux';
import { endCountdown } from '../../../../store/actions/countdown';

const EventModal = ({
  annualLeave,
  id,
  handleShow,
  show,
  start,
  end,
  title,
  update,
}) => {
  const dispatch = useDispatch();

  return (
    <Modal
      show={show}
      onHide={() => {
        handleShow();
        dispatch(endCountdown());
      }}
      centered
    >
      <Modal.Header closeButton>
        <Row style={{ width: '80%' }}>
          <Col>
            <Modal.Title>{title}</Modal.Title>
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <RequestForm
          annualLeave={annualLeave}
          id={id}
          from={formatted(start, 'form')}
          until={formatted(end, 'form')}
          update={update}
        />
      </Modal.Body>
    </Modal>
  );
};

export { EventModal };
