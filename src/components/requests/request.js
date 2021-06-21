import { useAuth } from 'hooks';
import { Card } from 'react-bootstrap';
import { capitalize, formatted, isAdmin } from 'helpers';
import { RequestConfirmationForm } from 'components';

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
          <RequestConfirmationForm id={id} />
        </Card.Footer>
      )}
    </Card>
  );
};
export default Request;
