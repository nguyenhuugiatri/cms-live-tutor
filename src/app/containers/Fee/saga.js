import { getFeeList, updateFee } from 'fetchers/feeFetcher';
import { takeLatest, put, call, all, fork } from 'redux-saga/effects';
import { actions } from './slice';

function* getFeeListWatcher() {
  yield takeLatest(actions.getFeeList, getFeeListTask);
}

function* getFeeListTask() {
  const { response, error } = yield call(getFeeListAPi);
  if (response) {
    yield put(actions.getFeeListSuccess(response));
  } else {
    console.log({ error });
  }
}

function getFeeListAPi() {
  return getFeeList();
}

function* updateFeeWatcher() {
  yield takeLatest(actions.updateFee, updateFeeTask);
}
function* updateFeeTask(action) {
  const { response, error } = yield call(updateFeeAPI, action.payload);
  if (response) {
    yield put(actions.updateFeeSuccess(response));
  } else {
    console.log({ error });
  }
}
function updateFeeAPI(payload) {
  return updateFee(payload);
}

export default function* defaultSaga() {
  yield all([fork(getFeeListWatcher), fork(updateFeeWatcher)]);
}
