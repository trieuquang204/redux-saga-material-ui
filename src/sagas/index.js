import { call, fork, take } from "redux-saga/effects";
import { getList } from "../apis/task";
import { STATUS_CODE } from "../constants";
import * as taskTypes from '../constants/task';

function* watchFetchListTaskAction() {
  yield take(taskTypes.FETCH_TASK);
  const resp = yield call(getList)
  const { status, data } = resp;
  if(status === STATUS_CODE.SUCCESS) {
    // dispatch action fetlistTasksucess  
  }else {
    // dispatch action fietlistTaskFailed 
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
