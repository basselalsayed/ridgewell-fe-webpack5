import { useState } from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getNotifications, updateNotification } from 'Actions';

const NotificationReadButton = ({ id, read }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setSubmitting(true);

    dispatch(updateNotification(id, read)).then(() => {
      dispatch(getNotifications());
      setSubmitting(false);
    });
  };

  return submitting ? (
    <Spinner
      style={{
        color: 'green',
        position: 'inherit',
        left: '50%',
        top: '50%',
        marginTop: '0.5rem',
      }}
      animation="border"
    />
  ) : (
    <Button onClick={handleSubmit}>{read ? 'Unread' : 'Read'}</Button>
  );
};

export { NotificationReadButton };
