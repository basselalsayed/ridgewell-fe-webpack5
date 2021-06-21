import { memo } from 'react';
import { Card } from 'react-bootstrap';
import { formatted } from 'helpers';
import { RequestsTable } from 'components';

const User = memo(({ email, updatedAt, username, owner: requests }) => (
  <Card>
    <Card.Title>{username}</Card.Title>
    <Card.Body>
      <p> Email: {email} </p>
      <p> Updated: {formatted(updatedAt, 'panelTime')} </p>
      {requests.length > 0 ? (
        <RequestsTable requests={requests} />
      ) : (
        <p style={{ color: 'orange' }}>No pending requests</p>
      )}
    </Card.Body>
  </Card>
));

export default User;
