import { useCallback } from 'react';
import { Formik } from 'formik';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { capitalize, formatted, isAdmin } from 'helpers';
import { useAuth, useCountdown } from 'hooks';
import { useRequests } from 'hooks/redux/useRequests';
import {
  CountdownCancel,
  NegativeButton,
  Status,
  SuccessButton,
} from '../forms';
import { CenteredSpinner } from '../Spinner';

const FormBase = ({ id }) => {
  const { isDelete, isPlaying } = useCountdown();

  const { confirmRequest, denyRequest } = useRequests();

  const onSubmit = useCallback(
    async (_, { setStatus }) =>
      isDelete ? denyRequest(id, setStatus) : confirmRequest(id, setStatus),
    []
  );

  return (
    <Formik initialValues={{ null: null }} onSubmit={onSubmit}>
      {({ handleSubmit, isSubmitting, status }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            {isSubmitting ? (
              <div style={{ width: '100%' }}>
                <CenteredSpinner />
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

const Request = ({
  createdAt,
  id,
  from,
  Holiday: { from: prevFrom, until: prevUntil },
  resolved,
  type,
  until,
  User: { email, id: userId, username },
}) => {
  const { loggedIn, user } = useAuth();

  return (
    <Card border={resolved ? 'success' : 'warning'}>
      <Card.Title>
        Owner: {username}, {email}
      </Card.Title>
      <Card.Body>
        <p> Type: {capitalize(type)} </p>
        {from && (
          <p>
            From: {formatted(from, 'panel')} (Previous:
            {formatted(prevFrom, 'panel')})
          </p>
        )}
        {until && (
          <p>
            Until: {formatted(until, 'panel')} (Previous:
            {formatted(prevUntil, 'panel')})
          </p>
        )}
        <p>Request made: {formatted(createdAt, 'panelTime')}</p>
        <p>Resolved: {capitalize(resolved)}</p>
      </Card.Body>

      {loggedIn && isAdmin(user) && (
        <Card.Footer>
          <FormBase id={id} />
        </Card.Footer>
      )}
    </Card>
  );
};
export { Request };
