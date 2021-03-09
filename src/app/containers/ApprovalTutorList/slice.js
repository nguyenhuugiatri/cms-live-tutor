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
  updateTutor: {
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

    updateTutor(state) {
      return flow(
        set('updateTutor.error', null),
        set('updateTutor.status', ACTION_STATUS.PENDING),
      )(state);
    },
    updateTutorSuccess(state, action) {
      return flow(
        set('updateTutor.data', action.payload),
        set('updateTutor.status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    updateTutorFalied(state, action) {
      return flow(
        set('updateTutor.error', action.payload),
        set('updateTutor.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});
export const { actions, reducer, name: sliceKey } = waitingListSlice;
