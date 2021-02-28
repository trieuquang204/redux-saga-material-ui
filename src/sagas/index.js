import {
  call,
  fork,
  take,
  put,
  delay,
  takeLatest,
  select,
  takeEvery,
} from "redux-saga/effects";
import {
  addTaskFailed,
  addTaskSuccess,
  fetchListTask,
  fetchListTaskFailed,
  fetchListTaskSuccess,
  filterTaskSuccess,
} from "../actions/task";
import { addTask, getList } from "../apis/task";
import { STATUSES, STATUS_CODE } from "../constants";
import * as taskTypes from "../constants/task";
import { showLoading, hideLoading } from "../actions/ui";
import { hideModal } from "../actions/modal";

function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskTypes.FETCH_TASK);
    yield put(showLoading());
    const params = action.payload;
    const resp = yield call(getList, params);
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
  yield put(fetchListTask({ q:keyword }));
  // const list = yield select((state) => state.task.listTask);
  // const filteredTask =
  //   list &&
  //   list.filter((task) =>
  //     task.title.trim().toLowerCase().includes(keyword.trim().toLowerCase())
  //   );
  // yield put(filterTaskSuccess(filteredTask));
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload;
  yield put(showLoading());
  const resp = yield call(addTask, {
    title,
    description,
    status: STATUSES[0].value,
  });
  const { data, status } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(addTaskFailed(data));
  }
  yield put(hideLoading());
}

// rootsaga la 1 gennerater function
function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
}

export default rootSaga;
