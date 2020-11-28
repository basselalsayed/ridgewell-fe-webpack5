import { useFormikContext } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { endCountdown } from '../../store/actions';
import {
  countdownWrp,
  countdownBtn,
  countdownTxt,
} from './countdown.module.css';

const CountdownCancel = ({ id }) => {
  const dispatch = useDispatch();
  const { submitForm } = useFormikContext();
  const { id: reduxId, isPlaying } = useSelector(
    state => state.countdownReducer,
  );

  const cancelButton = (
    <button className={countdownBtn} onClick={() => dispatch(endCountdown())}>
      <div className={countdownTxt}>Cancel</div>
    </button>
  );

  return (
    id === reduxId && (
      <div className={countdownWrp}>
        <CountdownCircleTimer
          children={cancelButton}
          isPlaying={isPlaying}
          duration={5}
          size={90}
          strokeWidth={5}
          colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
          onComplete={() => {
            submitForm();
            dispatch(endCountdown());
          }}
        />
      </div>
    )
  );
};

export { CountdownCancel };
