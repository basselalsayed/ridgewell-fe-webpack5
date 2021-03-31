import { useFormikContext } from 'formik';
import { useCountdown } from 'hooks';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import {
  countdownWrp,
  countdownBtn,
  countdownTxt,
} from './countdown.module.scss';

const CountdownCancel = ({ id }) => {
  const { endCountdown, isPlaying, reduxId } = useCountdown();

  const { submitForm } = useFormikContext();

  const cancelButton = (
    <button type="button" className={countdownBtn} onClick={endCountdown}>
      <div className={countdownTxt}>Cancel</div>
    </button>
  );

  return (
    id === reduxId && (
      <div className={countdownWrp}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={5}
          size={90}
          strokeWidth={5}
          colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
          onComplete={() => (submitForm(), endCountdown())}
        >
          {cancelButton}
        </CountdownCircleTimer>
      </div>
    )
  );
};

export { CountdownCancel };
