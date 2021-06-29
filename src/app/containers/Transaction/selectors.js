import { createSelector } from 'reselect';
import get from 'lodash/fp/get';
import { ACTION_STATUS } from 'utils/constants';

const selectTransaction = state => state.transaction;

export const makeTransactionList = createSelector(
  selectTransaction,
  transaction => get('transactionList', transaction),
);

export const makeLoading = createSelector(
  selectTransaction,
  status => get('status', status) === ACTION_STATUS.PENDING,
);

export const makeTotal = createSelector(selectTransaction, total =>
  get('total', total),
);
