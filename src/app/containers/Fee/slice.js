import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  list: [],
  total: 0,
  status: '',
  error: null,
  saveLoading: false,
};

const feeSlice = createSlice({
  name: 'fee',
  initialState: initialState,
  reducers: {
    getFeeList(state) {
      return flow(set('status', ACTION_STATUS.PENDING))(state);
    },
    getFeeListSuccess(state, action) {
      const { rows, count } = action.payload;
      return flow(
        set('list', rows),
        set('total', count),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    updateFee(state) {
      return flow(set('saveLoading', true))(state);
    },
    updateFeeSuccess(state) {
      return flow(set('saveLoading', false))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = feeSlice;
