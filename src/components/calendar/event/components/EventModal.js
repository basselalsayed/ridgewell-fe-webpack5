import { useCountdown } from 'hooks';
import { Modal, Col, Row } from 'react-bootstrap';

import { formatted } from 'helpers';
import { RequestForm } from 'components';

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
  const { isPlaying, endCountdown } = useCountdown();

  const handleHide = () => (handleShow(), isPlaying && endCountdown());

  return (
    <Modal show={show} onHide={handleHide} centered>
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
