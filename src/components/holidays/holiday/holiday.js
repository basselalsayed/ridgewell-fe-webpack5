import { Card } from 'react-bootstrap';
import { formatted } from '../../../helpers';
import { capitalize } from '../../../helpers';

const Holiday = ({
  confirmed,
  createdAt,
  from,
  until,
  HolidayRequests,
  User: { email, username },
}) => {
  const approvedBy =
    HolidayRequests[0].managerId[0] && HolidayRequests[0].managerId[0].username;
  const approvedDate =
    HolidayRequests[0].managerId[0] &&
    HolidayRequests[0].managerId[0].ApprovedRequests.createdAt;

  return (
    <Card border={confirmed ? 'success' : 'warning'}>
      <Card.Title>
        Owner: {username}, {email}
      </Card.Title>
      <Card.Body>
        <p> From: {formatted(from, 'panel')} </p>
        <p> Until: {formatted(until, 'panel')} </p>
        <p> Request made: {formatted(createdAt, 'panelTime')} </p>
      </Card.Body>
      <Card.Footer>{`Confirmed: ${capitalize(confirmed)}`}</Card.Footer>
      {approvedBy && approvedDate && (
        <Card.Footer>
          Confirmed by: <strong>{approvedBy + ' '}</strong> on
          <strong>{' ' + formatted(approvedDate, 'panelTime')}</strong>
        </Card.Footer>
      )}
    </Card>
  );
};

export { Holiday };
