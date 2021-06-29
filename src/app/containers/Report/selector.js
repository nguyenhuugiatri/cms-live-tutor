import { createSelector } from 'reselect';
import get from 'lodash/fp/get';
import { ACTION_STATUS } from 'utils/constants';

const selectReport = state => state.report;

export const makeReportList = createSelector(selectReport, list =>
  get('reportList', list),
);

export const makeTotal = createSelector(selectReport, total =>
  get('total', total),
);

export const makeLoading = createSelector(selectReport, loading =>
  get('status', ACTION_STATUS.PENDING),
);
