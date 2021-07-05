import { getTutorDetail, updateTutor } from 'fetchers/tutorFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* getTutorDetailWatcher() {
  yield takeLatest(actions.getTutorDetail, getTutorDetailTask);
}

function* getTutorDetailTask(action) {
  const { response, error } = yield call(getTutorDetail, action.payload);
  if (response) {
    yield put(actions.getTutorDetailSuccess(response));
  } else {
    yield put(actions.getTutorDetailFailed(error.data));
  }
}

function* approvalTutorWatcher() {
  yield takeLatest(actions.approvalTutor, approvalTutorTask);
}
function* approvalTutorTask(action) {
  const { approval, id } = action.payload;
  const { response, error } = yield call(updateTutor, {
    isActivated: approval,
    userId: id,
  });
  if (response) {
    yield put(actions.approvalTutorSuccess({ approval }));
  } else {
    yield put(actions.approvalTutorFailed({ approval, error }));
  }
}
export default function* defaultSaga() {
  yield all([fork(getTutorDetailWatcher), fork(approvalTutorWatcher)]);
}
