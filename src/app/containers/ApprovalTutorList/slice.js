import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  waitingList: {
    data: [],
    error: null,
    status: '',
  },
};
const waitingListSlice = createSlice({
  name: 'waitingList',
  initialState,
  reducers: {
    getWaitingList(state) {
      return flow(
        set('waitingList.error', null),
        set('waitingList.status', ACTION_STATUS.PENDING),
      )(state);
    },
    getWaitingListSuccess(state, action) {
      return flow(
        set('waitingList.data', action.payload),
        set('waitingList.status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    getWaitingListFalied(state, action) {
      return flow(
        set('waitingList.error', action.payload),
        set('waitingList.status', ACTION_STATUS.FAILED),
      )(state);
    },
    handleOpenModal(state) {
      return flow(set('error', null))(state);
    },
    openModal(state, action) {
      return flow(
        set('currentUser', action.payload),
        set('visible', true),
      )(state);
    },
    closeModal(state) {
      return flow(set('visible', false))(state);
    },
  },
});
export const { actions, reducer, name: sliceKey } = waitingListSlice;
