import { getTransactionList } from 'fetchers/transactionFetcher';
import { takeLatest, put, call, all, fork } from 'redux-saga/effects';
import { actions } from './slice';

function* getListTransactionWatcher() {
  yield takeLatest(actions.getTransactionList, getListTransactionTask);
}

function* getListTransactionTask(action) {
  const { response, error } = yield call(
    getListTransactionAPI,
    action.payload || { page: 1, perPage: 20 },
  );
  if (response) {
    yield put(actions.getTransactionListSuccess(response));
  } else {
    console.log({ error });
  }
}

function getListTransactionAPI({ page = 1, perPage = 20 }) {
  return getTransactionList({ page, perPage });
}

export default function* defaultSaga() {
  yield all([fork(getListTransactionWatcher)]);
}
