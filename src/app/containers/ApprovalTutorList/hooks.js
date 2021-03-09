import useActions from 'hooks/useActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSelectWaitingList } from './selectors';
export const useHooks = () => {
  const { getWaitingList } = useActions(
    { getWaitingList: actions.getWaitingList },
    [actions],
  );
  const waitingList = useSelector(makeSelectWaitingList);
  const handleBlock = ({ id, type }) => {
    // if (type) {
    //   updateRecord({ id, isBlocked: false });
    // } else {
    //   updateRecord({ id, isBlocked: true });
    // }
  };
  useEffect(() => {
    getWaitingList();
  }, [getWaitingList]);
  return {
    selectors: {
      waitingList,
    },
    handles: {
      handleBlock,
    },
  };
};
export default useHooks;
