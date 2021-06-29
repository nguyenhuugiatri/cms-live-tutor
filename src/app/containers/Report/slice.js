import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  status: '',
  error: null,
  total: 0,
  reportList: [],
};

const reportSlice = createSlice({
  name: 'report',
  initialState: initialState,
  reducers: {
    getReport(state) {
      return flow(set('status', ACTION_STATUS.PENDING))(state);
    },
    getReportSuccess(state, action) {
      const { rows, count } = action.payload;
      return flow(
        set('reportList', rows),
        set('total', count),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = reportSlice;
