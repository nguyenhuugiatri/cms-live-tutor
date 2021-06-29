import { getReportList } from 'fetchers/reportFetcher';
import { takeLatest, put, call, all, fork } from 'redux-saga/effects';
import { actions } from './slice';

function* getReportListWatcher() {
  yield takeLatest(actions.getReport, getReportListTask);
}

function* getReportListTask(action) {
  const { response, error } = yield call(
    getReportListAPI,
    action.payload || { page: 1, perPage: 20 },
  );
  if (response) {
    yield put(actions.getReportSuccess(response));
  } else {
    console.log({ error });
  }
}

function getReportListAPI({ page = 1, perPage = 20 }) {
  return getReportList({ page, perPage });
}

export default function* defaultSaga() {
  yield all([fork(getReportListWatcher)]);
}
