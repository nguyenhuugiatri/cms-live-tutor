import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { getListWaitingApproval } from 'fetchers/tutorFetcher';

function* getListWaitingWatcher() {
  yield takeLatest(actions.getWaitingList, getListWaitingTask);
}
function* getListWaitingTask() {
  const { response, error } = yield call(getListWaitingAPI);
  console.log('response', response);
  if (response) {
    yield put(actions.getWaitingListSuccess(response));
  } else {
    yield put(actions.getWaitingListFalied(error));
  }
}
function getListWaitingAPI() {
  return getListWaitingApproval();
}

export default function* defaultSaga() {
  yield all([fork(getListWaitingWatcher)]);
}
