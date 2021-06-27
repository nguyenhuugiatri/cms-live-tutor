import { createSelector } from 'reselect';
import get from 'lodash/fp/get';
import { ACTION_STATUS } from 'utils/constants';

const selectTutorList = state => state.userList;

export const makeUserList = createSelector(selectTutorList, list =>
  get('list', list),
);

export const makeTotal = createSelector(selectTutorList, total =>
  get('total', total),
);

export const makeLoading = createSelector(selectTutorList, status => {
  return get('status', status) === ACTION_STATUS.PENDING;
});
