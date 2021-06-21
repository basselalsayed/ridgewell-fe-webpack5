import { useCallback } from 'react';
import { useCountdown, useRequests } from 'hooks';
import { Formik } from 'formik';
import { Col, Form } from 'react-bootstrap';
import {
  CountdownCancel,
  NegativeButton,
  Spinner,
  Status,
  SuccessButton,
} from 'components';

const RequestConfirmationForm = ({ id }) => {
  const { isDelete, isPlaying } = useCountdown();

  const { confirmRequest, denyRequest } = useRequests();

  const onSubmit = useCallback(
    async (_, { setStatus }) =>
      isDelete ? denyRequest(id, setStatus) : confirmRequest(id, setStatus),
    [isDelete]
  );

  return (
    <Formik initialValues={{ null: null }} onSubmit={onSubmit}>
      {({ handleSubmit, isSubmitting, status }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            {isSubmitting ? (
              <div style={{ width: '100%' }}>
                <Spinner />
              </div>
            ) : isPlaying ? (
              <CountdownCancel id={id} />
            ) : (
              <>
                <Col>
                  <NegativeButton id={id} title="Deny Request" />
                </Col>
                <Col>
                  <SuccessButton id={id} title="Confirm Request" />
                </Col>
              </>
            )}
          </Form.Group>
          {status && <Status {...{ status }} />}
        </Form>
      )}
    </Formik>
  );
};

export default RequestConfirmationForm;
