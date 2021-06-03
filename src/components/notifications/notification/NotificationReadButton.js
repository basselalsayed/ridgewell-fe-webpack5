import { memo, useCallback, useState } from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateNotification } from 'store/modules';

const NotificationReadButton = memo(({ id, handleRead, read }) => {
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    setSubmitting(true);

    dispatch(updateNotification(id, !read));
    setTimeout(() => {
      handleRead();

      setSubmitting(false);
    }, 200);
  }, [id, read]);

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
});

export { NotificationReadButton };
