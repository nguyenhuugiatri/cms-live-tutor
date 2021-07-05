import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  data: {},
  status: '',
  error: null,
  actionStatus: {
    accept: '',
    deny: '',
  },
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

    approvalTutor(state, action) {
      const { approval } = action.payload;
      const status = approval ? 'accept' : 'deny';

      return flow(set(`actionStatus.${status}`, ACTION_STATUS.PENDING))(state);
    },
    approvalTutorSuccess(state, action) {
      const { approval } = action.payload;
      const status = approval ? 'accept' : 'deny';
      return flow(set(`actionStatus.${status}`, ACTION_STATUS.SUCCESS))(state);
    },
    approvalTutorFailed(state, action) {
      const { approval, error } = action.payload;
      const status = approval ? 'accept' : 'deny';
      return flow(
        set('error', error),
        set(`actionStatus.${status}`, ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = tutorDetailSlice;
