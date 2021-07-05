import { useState, useCallback } from 'react';

export const useHooks = props => {
  const [isSelectDate, setIsSelectDate] = useState(false);
  const onSelectDate = useCallback(value => {
    setIsSelectDate(true);
  }, []);
  const handleBackSelectDate = useCallback(() => {
    setIsSelectDate(false);
  }, []);

  return {
    handlers: { onSelectDate, handleBackSelectDate },
    selectors: { isSelectDate },
  };
};

export default useHooks;
