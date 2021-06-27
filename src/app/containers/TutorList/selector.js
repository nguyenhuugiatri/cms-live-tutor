import { createSelector } from 'reselect';
import get from 'lodash/fp/get';
import { ACTION_STATUS } from 'utils/constants';

const selectTutorList = state => state.tutorList;

export const makeLoading = createSelector(selectTutorList, status => {
  return get('status', status) === ACTION_STATUS.PENDING;
});

export const makeListTutor = createSelector(selectTutorList, list =>
  get('list', list),
);
