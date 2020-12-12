import { NotificationReadButton } from '.';
import { formatted } from '../../../helpers';

const Notification = ({ id, createdAt, message, read, index }) => (
  <tr style={{ backgroundColor: read ? 'gray' : 'white' }}>
    <td>{index + 1}</td>
    <td>{message}</td>
    <td>{formatted(createdAt, 'panelTime')}</td>
    <td style={{ textAlign: 'center' }}>
      <NotificationReadButton id={id} read={read} />
    </td>
  </tr>
);

export { Notification };
