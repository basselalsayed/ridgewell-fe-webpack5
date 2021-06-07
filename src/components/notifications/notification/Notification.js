import { formatted } from 'helpers';
import { memo } from 'react';
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
    <td>{formatted(createdAt, 'panelTime')}</td>
    <td style={{ textAlign: 'center' }}>
      <NotificationReadButton id={id} read={read} />
    </td>
  </tr>
));

export { Notification };
