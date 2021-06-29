import { useSelector } from 'react-redux';
import { makeTotal } from './selectors';

export const useHooks = () => {
  const total = useSelector(makeTotal);
  return {
    selectors: { total },
    handlers: {},
  };
};
