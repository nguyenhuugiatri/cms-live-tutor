import { useSelector } from 'react-redux';
import { makeTotal } from './selector';

export const useHooks = () => {
  const total = useSelector(makeTotal);
  return {
    selectors: { total },
  };
};
