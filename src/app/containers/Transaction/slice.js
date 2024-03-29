import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  status: '',
  transactionList: [],
  total: 0,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialState,
  reducers: {
    getTransactionList(state) {
      return flow(set('status', ACTION_STATUS.PENDING))(state);
    },
    getTransactionListSuccess(state, action) {
      const { rows, count } = action.payload;
      return flow(
        set('status', ACTION_STATUS.SUCCESS),
        set('total', count),
        set('transactionList', rows),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = transactionSlice;
