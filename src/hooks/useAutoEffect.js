import { useEffect } from 'react';

const useAutoEffect = ({ condition, callback, deps }) =>
  useEffect(() => {
    if (condition) callback();
  }, deps);

export { useAutoEffect };
