import { call, fork, take, put, delay } from "redux-saga/effects";
import { fetchListTaskFailed, fetchListTaskSuccess } from "../actions/task";
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
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* watchCreateTaskAction() {
  console.log("watchCreateTaskAction");
}

// rootsaga la 1 gennerater function
function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield fork(watchCreateTaskAction);
}

export default rootSaga;
