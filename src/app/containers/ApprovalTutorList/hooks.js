import useActions from 'hooks/useActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSelectWaitingList, makeSelectUpdateTutor } from './selectors';
export const useHooks = () => {
  const { getWaitingList, updateTutor } = useActions(
    {
      getWaitingList: actions.getWaitingList,
      updateTutor: actions.updateTutor,
    },
    [actions],
  );
  const waitingListSelect = useSelector(makeSelectWaitingList);
  const updateTutorSelect = useSelector(makeSelectUpdateTutor);

  const handleDenyTutor = data => {
    const { userId } = data;
    updateTutor({
      userId,
      isActivated: false,
    });
  };

  const handleAcceptTutor = data => {
    const { userId } = data;
    console.log('userId', userId);
    updateTutor({
      userId,
      isActivated: true,
    });
  };

  useEffect(() => {
    getWaitingList();
  }, [getWaitingList, updateTutorSelect]);
  return {
    selectors: {
      waitingList: waitingListSelect.data,
    },
    handles: {
      handleDenyTutor,
      handleAcceptTutor,
    },
  };
};
export default useHooks;
