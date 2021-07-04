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

export const makeTotal = createSelector(selectTutorList, total =>
  get('total', total),
);

export const makeLoadingAction = createSelector(selectTutorList, state => {
  return {
    deny: get('actionStatus.deny', state) === ACTION_STATUS.PENDING,
    accept: get('actionStatus.accept', state) === ACTION_STATUS.PENDING,
  };
});
