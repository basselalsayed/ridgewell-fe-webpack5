import { formatted } from 'helpers';
import { memo, useCallback, useState } from 'react';
import { NotificationReadButton } from '.';

const Notification = memo(({ id, createdAt, message, read, index }) => {
  const [isRead, setIsRead] = useState(read);

  const handleRead = useCallback(() => setIsRead((prevRead) => !prevRead), [
    isRead,
    setIsRead,
  ]);

  return (
    <tr style={{ backgroundColor: isRead ? 'gray' : 'white' }}>
      <td>{index + 1}</td>
      <td>{message}</td>
      <td>{formatted(createdAt, 'panelTime')}</td>
      <td style={{ textAlign: 'center' }}>
        <NotificationReadButton id={id} read={isRead} handleRead={handleRead} />
      </td>
    </tr>
  );
});

export { Notification };
