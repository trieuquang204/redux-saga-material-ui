import { call, fork, take, put } from "redux-saga/effects";
import { fetchListTaskFailed, fetchListTaskSuccess } from "../actions/task";
import { getList } from "../apis/task";
import { STATUS_CODE } from "../constants";
import * as taskTypes from "../constants/task";

function* watchFetchListTaskAction() {
  while (true) {
    yield take(taskTypes.FETCH_TASK);
    const resp = yield call(getList);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      // dispatch action fetlistTasksucess
      yield put(fetchListTaskSuccess(data));
    } else {
      // dispatch action fietlistTaskFailed
      yield put(fetchListTaskFailed(error));
    }
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
