import useActions from 'hooks/useActions';
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { makeSelectWaitingList, makeSelectUpdateTutor } from './selectors';
export const useHooks = () => {
  const { getWaitingList, updateTutor } = useActions(
    {
      getWaitingList: actions.getWaitingList,
      updateTutor: actions.updateTutor,
    },
    [actions],
  );

  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

  const waitingListSelect = useSelector(makeSelectWaitingList);
  const updateTutorSelect = useSelector(makeSelectUpdateTutor);

  const showInfoTutor = useCallback(
    tutor => {
      openPopup({
        key: 'showInfoTutor',
        type: POPUP_TYPE.INFO_TUTOR,
        tutor,
      });
    },
    [openPopup],
  );

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
      showInfoTutor,
    },
  };
};
export default useHooks;
