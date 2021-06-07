import { memo } from 'react';
import { formatDistance } from 'date-fns';
import { NotificationReadButton } from '.';

const Notification = memo(({ id, createdAt, message, read, index }) => (
  <tr
    style={{
      backgroundColor: read ? 'gray' : 'white',
      verticalAlign: 'middle',
    }}
  >
    <td>{index + 1}</td>
    <td>{message}</td>
    <td>{formatDistance(new Date(createdAt), new Date())} ago</td>
    <td style={{ textAlign: 'center' }}>
      <NotificationReadButton id={id} read={read} />
    </td>
  </tr>
));

export { Notification };
