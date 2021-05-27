import { useEffect, useState } from 'react';

const useLoadingDelay = ({ loaded, loading, timeout = 750 }) => {
  const [showLoading, setShowLoading] = useState(loading);

  useEffect(() => {
    if (!loading && loaded) {
      setTimeout(() => setShowLoading(false), timeout);
    }
  }, [loaded, loading]);

  return {
    showLoading,
  };
};

export { useLoadingDelay };
