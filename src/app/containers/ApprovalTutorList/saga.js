import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { getListWaitingApproval, updateTutor } from 'fetchers/tutorFetcher';

function* getListWaitingWatcher() {
  yield takeLatest(actions.getWaitingList, getListWaitingTask);
}

function* updateTutorWatcher() {
  yield takeLatest(actions.updateTutor, updateTutorTask);
}

function* updateTutorTask(action) {
  const { response, error } = yield call(updateTutorAPI, action.payload);
  console.log('response', response);
  if (response) {
    yield put(actions.updateTutorSuccess(response));
  } else {
    yield put(actions.updateTutorFalied(error));
  }
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

function updateTutorAPI(payload) {
  return updateTutor(payload);
}

export default function* defaultSaga() {
  yield all([fork(getListWaitingWatcher), fork(updateTutorWatcher)]);
}
