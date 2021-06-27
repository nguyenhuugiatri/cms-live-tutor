import { getListUser, manageActivated } from 'fetchers/userFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* getListUserWatcher() {
  yield takeLatest(actions.getListUser, getListUserTask);
}
function* getListUserTask(action) {
  //action.payload = {page,perPage},
  const { response, error } = yield call(
    getListUserApi,
    action.payload || { page: 1, perPage: 10 },
  );
  if (response) {
    yield put(actions.getListUserSuccess(response));
  } else {
    console.log(error);
  }
}
function getListUserApi({ page = 1, perPage = 10 }) {
  return getListUser({ page, perPage });
}

function* manageActivatedWatcher() {
  yield takeLatest(actions.manageActivated, manageActivatedTask);
}
function* manageActivatedTask(action) {
  const { response, error } = yield call(manageActivatedAPI, action.payload);
  if (response) {
    const { id, isActivated } = action.payload;
    yield put(actions.manageActivatedSuccess({ id, isActivated }));
  } else {
    console.log({ error });
  }
}
function manageActivatedAPI(payload) {
  return manageActivated(payload);
}
export default function* defaultSaga() {
  yield all([fork(getListUserWatcher), fork(manageActivatedWatcher)]);
}
