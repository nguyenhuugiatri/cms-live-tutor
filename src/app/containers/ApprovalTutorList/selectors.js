import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

export const selectWaitingListState = state => state.waitingList;

export const makeSelectWaitingList = createSelector(
  selectWaitingListState,
  waitingList => get('waitingList', waitingList),
);
export const makeVisible = createSelector(selectWaitingListState, visible =>
  get('visible', visible),
);
export const makeCurrentUser = createSelector(
  selectWaitingListState,
  currentUser => get('currentUser', currentUser),
);
export const makeRate = createSelector(
  selectWaitingListState,
  currentUserRate => get('currentUserRate', currentUserRate),
);
