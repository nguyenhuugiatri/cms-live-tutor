import { getListTutor, updateTutor } from 'fetchers/tutorFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* getListTutorWatcher() {
  yield takeLatest(actions.getList, getListTutorTask);
}
function* getListTutorTask(action) {
  //action.payload = {page,perPage},
  const { response, error } = yield call(
    getListTutorApi,
    action.payload || { page: 1, perPage: 10 },
  );
  if (response) {
    const { tutors } = response;
    yield put(actions.getListSuccess(tutors));
  } else {
    console.log(error);
  }
}
function getListTutorApi({ page = 1, perPage = 10 }) {
  return getListTutor({ page, perPage });
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
  yield all([fork(getListTutorWatcher), fork(approvalTutorWatcher)]);
}
