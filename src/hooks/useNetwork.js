import { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setOffline, setOnline } from 'store/modules/network';

const useNetwork = () => {
  const dispatch = useDispatch();

  const _setOnline = useCallback(() => dispatch(setOnline()), [dispatch]);

  const _setOffline = useCallback(() => dispatch(setOffline()), [dispatch]);

  useEffect(() => {
    if (window) {
      window.addEventListener('online', _setOnline);
      window.addEventListener('offline', _setOffline);
    }
    return () => {
      window.removeEventListener('online', _setOnline);
      window.removeEventListener('offline', _setOffline);
    };
  }, []);

  const { isOnline, offlineQueue } = useSelector(
    (state) => state.network,
    shallowEqual
  );

  return {
    isOnline,
    offlineQueue,
    setOnline: _setOnline,
    setOffline: _setOffline,
  };
};

export { useNetwork };
