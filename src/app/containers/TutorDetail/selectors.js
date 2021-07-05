import get from 'lodash/fp/get';
import { createSelector } from 'reselect';
import { ACTION_STATUS } from 'utils/constants';

const selectTutorDetailState = state => state.tutorDetail;

export const selectTutorDetailData = createSelector(
  selectTutorDetailState,
  tutorDetail => get('data', tutorDetail),
);

export const selectTutorDetailStatus = createSelector(
  selectTutorDetailState,
  tutorDetail => get('status', tutorDetail),
);

export const makeLoadingAction = createSelector(
  selectTutorDetailState,
  state => {
    return {
      deny: get('actionStatus.deny', state) === ACTION_STATUS.PENDING,
      accept: get('actionStatus.accept', state) === ACTION_STATUS.PENDING,
    };
  },
);
