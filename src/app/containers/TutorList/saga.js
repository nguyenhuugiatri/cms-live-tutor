import { getListTutor } from 'fetchers/tutorFetcher';
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

export default function* defaultSaga() {
  yield all([fork(getListTutorWatcher)]);
}
