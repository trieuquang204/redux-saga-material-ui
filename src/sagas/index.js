import {
  call,
  fork,
  take,
  put,
  delay,
  takeLatest,
  select,
} from "redux-saga/effects";
import {
  fetchListTaskFailed,
  fetchListTaskSuccess,
  filterTaskSuccess,
} from "../actions/task";
import { getList } from "../apis/task";
import { STATUS_CODE } from "../constants";
import * as taskTypes from "../constants/task";
import { showLoading, hideLoading } from "../actions/ui";

function* watchFetchListTaskAction() {
  while (true) {
    yield take(taskTypes.FETCH_TASK);
    yield put(showLoading());
    const resp = yield call(getList);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      // dispatch action fetlistTasksucess
      yield put(fetchListTaskSuccess(data));
    } else {
      // dispatch action fietlistTaskFailed
      yield put(fetchListTaskFailed(error));
    }
    // yield delay(1000);
    yield put(hideLoading());
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const keyword = payload;
  const list = yield select((state) => state.task.listTask);
  const filteredTask =
    list &&
    list.filter((task) =>
      task.title.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
  yield put(filterTaskSuccess(filteredTask));
}

// rootsaga la 1 gennerater function
function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
}

export default rootSaga;
