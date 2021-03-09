import * as taskConstants from "../constants/task";
import { toastError, toastSuccess } from "../helpers/toastHelper";

const initialState = {
  listTask: [],
  taskEditing: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case taskConstants.FETCH_TASK: {
      return {
        ...state,
        listTask: [],
      };
    }

    case taskConstants.FETCH_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }

    case taskConstants.FETCH_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listTask: [],
      };
    }
    case taskConstants.FILTER_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }
    case taskConstants.ADD_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.ADD_TASK_SUCCESS: {
      const data = action.payload;
      toastSuccess("Them moi cong viec thanh cong");
      return {
        ...state,
        listTask: state.listTask.concat([data]),
      };
    }
    case taskConstants.ADD_TASK_FAILED: {
      const error = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskConstants.SET_TASK_EDITING: {
      const task = action.payload;
      return {
        ...state,
        taskEditing: task,
      };
    }
    case taskConstants.UPDATE_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.UPDATE_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTask } = state;
      const index = listTask.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listTask.slice(0, index),
          data,
          ...listTask(index + 1),
        ];
        toastSuccess("Cap nhat cong viec thanh cong");
        return {
          ...state,
          listTask: newList,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case taskConstants.UPDATE_TASK_FAILED: {
      const error = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskConstants.DELETE_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.DELETE_TASK_SUCCESS: {
      const { data: taskId } = action.payload;
      toastSuccess("Xoa cong viec thanh cong");
      return {
        ...state,
        listTask: state.listTask.filter((item) => item.id !== taskId),
      };
    }
    case taskConstants.DELETE_TASK_FAILED: {
      const error = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
