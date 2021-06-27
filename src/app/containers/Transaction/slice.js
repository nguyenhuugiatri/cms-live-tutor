import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  status: '',
  transactionList: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialState,
  reducers: {
    getTransactionList(state) {
      return flow(set('status', ACTION_STATUS.PENDING))(state);
    },
    getTransactionListSuccess(state, action) {
      return flow(
        set(
          'status',
          ACTION_STATUS.SUCCESS,
          set('transactionList', action.payload),
        ),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = transactionSlice;
