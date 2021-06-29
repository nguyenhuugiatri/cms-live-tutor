import { createSelector } from 'reselect';
import get from 'lodash/fp/get';
import { ACTION_STATUS } from 'utils/constants';

const selectFee = state => state.fee;

export const makeListFee = createSelector(selectFee, list => get('list', list));

export const makeTotal = createSelector(selectFee, total =>
  get('total', total),
);

export const makeLoading = createSelector(
  selectFee,
  loading => get('status', loading) === ACTION_STATUS.PENDING,
);
