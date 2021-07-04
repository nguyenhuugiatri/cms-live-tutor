import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  data: {},
  status: '',
  error: null,
};

const tutorDetailSlice = createSlice({
  name: 'tutorDetail',
  initialState,
  reducers: {
    getTutorDetail(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    getTutorDetailSuccess(state, action) {
      const { tutor, ...rest } = action.payload;
      return flow(
        set('data', { ...rest, ...tutor }),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getTutorDetailFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = tutorDetailSlice;
