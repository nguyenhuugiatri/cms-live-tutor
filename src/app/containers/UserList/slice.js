import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  total: 0,
  list: [],
  status: '',
  error: null,
};

const userList = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    getListUser(state) {
      return flow(set('status', ACTION_STATUS.PENDING))(state);
    },
    getListUserSuccess(state, action) {
      const { rows, count } = action.payload;
      return flow(
        set('status', ACTION_STATUS.SUCCESS),
        set('list', rows),
        set('total', count),
      )(state);
    },
    manageActivated(state) {
      return state;
    },
    manageActivatedSuccess(state, action) {
      const { id, isActivated } = action.payload;
      console.log(id, isActivated);
      const list = [...state.list].map(user => {
        if (user.id === id) {
          return {
            ...user,
            isActivated: !isActivated,
          };
        }
        return user;
      });
      return flow(set('list', list))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = userList;
