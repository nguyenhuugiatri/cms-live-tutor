import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

export const selectWaitingListState = state => state.waitingList;

export const makeSelectWaitingList = createSelector(
  selectWaitingListState,
  waitingList => get('waitingList', waitingList),
);

export const makeSelectUpdateTutor = createSelector(
  selectWaitingListState,
  waitingList => get('updateTutor', waitingList),
);
