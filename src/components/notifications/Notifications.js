import { Table } from 'react-bootstrap';
import { Notification } from './notification';

const Notifications = ({ notifications }) => {
  const headerRow = (
    <thead>
      <tr>
        <th>#</th>
        <th>Message</th>
        <th>Time</th>
        <th>Read/Unread</th>
      </tr>
    </thead>
  );

  const notificationRows =
    notifications &&
    notifications.map((notification, idx) => (
      <Notification key={notification.id} {...notification} index={idx} />
    ));

  return (
    <div
      style={{
        marginTop: '1rem',
        maxHeight: window.innerHeight - 150,
        overflow: 'auto',
      }}
    >
      <Table striped bordered hover size="sm">
        {headerRow}
        <tbody>{notificationRows}</tbody>
      </Table>
    </div>
  );
};

export { Notifications };
