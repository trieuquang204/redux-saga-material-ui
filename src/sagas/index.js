import { fork } from "redux-saga/effects";

function* watchFetchListTaskAction() {
  console.log("watchFetchListTaskAction");
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
