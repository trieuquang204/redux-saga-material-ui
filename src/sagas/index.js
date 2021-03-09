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
  deleteTaskFailed,
  deleteTaskSuccess,
  fetchListTask,
  fetchListTaskFailed,
  fetchListTaskSuccess,
  filterTaskSuccess,
  updateTaskFailed,
  updateTaskSuccess,
} from "../actions/task";
import { addTask, deleteTask, getList, updateTask } from "../apis/task";
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
  yield put(fetchListTask({ q: keyword }));
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

function* updateTaskSaga({ payload }) {
  const { title, description, status } = payload;
  const taskEditing = yield select((state) => state.task.taskEditing);
  yield put(showLoading());
  const resp = yield call(
    updateTask,
    { title, description, status },
    taskEditing.id
  );
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(updateTaskFailed(data));
  }
  yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteTask, id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(deleteTaskSuccess(id));
    yield put(hideModal());
  } else {
    yield put(deleteTaskFailed(data));
  }
  yield put(hideLoading());
}

// rootsaga la 1 gennerater function
function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
}

export default rootSaga;
