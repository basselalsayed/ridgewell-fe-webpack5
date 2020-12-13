import { Card } from 'react-bootstrap';
import { formatted } from 'Helpers';
import { RequestsTable } from '../../home/event/components';

const User = ({ email, updatedAt, username, owner: requests }) => {
  return (
    <Card>
      <Card.Title>{username}</Card.Title>
      <Card.Body>
        <p> Email: {email} </p>
        <p> Updated: {formatted(updatedAt, 'panelTime')} </p>
        <RequestsTable requests={requests} />
      </Card.Body>
    </Card>
  );
};

export { User };
