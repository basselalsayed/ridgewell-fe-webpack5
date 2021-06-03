import { useEffect } from 'react';

const useAutoEffect = ({ deps, condition, callback }) =>
  useEffect(() => {
    if (condition) callback();
  }, deps);

export { useAutoEffect };
