import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  endCountdown,
  startConfirmCountdown,
  startDeleteCountdown,
} from 'store/actions';
import { useCallback } from 'react';

const useCountdown = () => {
  const dispatch = useDispatch();

  const { id: reduxId, isDelete, isPlaying } = useSelector(
    (state) => state.countdown,
    shallowEqual
  );

  const _endCountDown = useCallback(() => {
    dispatch(endCountdown());
  }, [dispatch]);

  const _startConfirmCountdown = useCallback(
    (id) => {
      dispatch(startConfirmCountdown(id));
    },
    [dispatch]
  );

  const _startDeleteCountdown = useCallback(
    (id) => {
      dispatch(startDeleteCountdown(id));
    },
    [dispatch]
  );

  return {
    endCountdown: _endCountDown,
    startConfirmCountdown: _startConfirmCountdown,
    startDeleteCountdown: _startDeleteCountdown,
    isDelete,
    isPlaying,
    reduxId,
  };
};

export { useCountdown };
