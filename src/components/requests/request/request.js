import { Card, Row, Col, Form } from 'react-bootstrap';
import { capitalize, formatted, isAdmin } from '../../../helpers';

import {
  CountdownCancel,
  NegativeButton,
  Status,
  SuccessButton,
} from '../../forms';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAll } from '../../../store/actions';
import { CenteredSpinner } from '../../Spinner';

const FormBase = ({ id }) => {
  const { isDelete, isPlaying } = useSelector(state => state.countdownReducer);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ null: null }}
      onSubmit={async (_, { setStatus }) =>
        await axios
          .put(`requests/${id}/${isDelete ? 'deny' : 'confirm'}`)
          .then(res => {
            res && setStatus(res.data.message);
            dispatch(getAll());
          })
          .catch(err =>
            setStatus(
              `${err.response.statusText}: ${err.response.data.message}`,
            ),
          )
      }
    >
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
                  <NegativeButton id={id} title={'Deny Request'} />
                </Col>
                <Col>
                  <SuccessButton id={id} title={'Confirm Request'} />
                </Col>
              </>
            )}
          </Form.Group>
          {status && <Status status={status} />}
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
  const { user } = useSelector(state => state.authReducer);

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

      {isAdmin(user) && (
        <Card.Footer>
          <FormBase id={id} />
        </Card.Footer>
      )}
    </Card>
  );
};
export { Request };
