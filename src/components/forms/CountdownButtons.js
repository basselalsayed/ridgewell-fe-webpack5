import { useCountdown } from 'hooks';
import { Button } from 'react-bootstrap';

import { dangerBtn, successBtn } from '../index.module.scss';

const SuccessButton = ({ errors, id, title }) => {
  const { startConfirmCountdown } = useCountdown();
  return (
    <Button
      onClick={() =>
        errors
          ? !errors.from && !errors.until && startConfirmCountdown(id)
          : startConfirmCountdown(id)
      }
      className={successBtn}
      children={title}
    />
  );
};

const NegativeButton = ({ id, title }) => {
  const { startDeleteCountdown } = useCountdown();

  return (
    <Button
      onClick={() => startDeleteCountdown(id)}
      className={dangerBtn}
      children={title}
    />
  );
};

export { NegativeButton, SuccessButton };
