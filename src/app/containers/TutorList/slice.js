import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  list: [],
  total: 0,
  status: '',
  error: null,
};

const tutorList = createSlice({
  name: 'tutorList',
  initialState: initialState,
  reducers: {
    getList(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },
    getListSuccess(state, action) {
      const { count, rows } = action.payload;
      return flow(
        set('list', rows),
        set('total', count),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = tutorList;
