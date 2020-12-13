import { Button } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { startConfirmCountdown, startDeleteCountdown } from 'Actions';
import { dangerBtn, successBtn } from '../index.module.css';

const SuccessButton = ({ errors, id, title }) => {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() =>
        errors
          ? !errors.from && !errors.until && dispatch(startConfirmCountdown(id))
          : dispatch(startConfirmCountdown(id))
      }
      className={successBtn}
      children={title}
    />
  );
};

const NegativeButton = ({ id, title }) => {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(startDeleteCountdown(id))}
      className={dangerBtn}
      children={title}
    />
  );
};

export { NegativeButton, SuccessButton };
