import axiosService from "../commons/axiosService";
import { API_ENDPOINT } from "../constants";
import qs from "query-string";

const url = "tasks";

export const getList = (params = {}) => {
  let queryParams = "";
  // Kiem tra trong object nay co key hay khong?
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`);
};

export const addTask = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url}`, data);
};

export const updateTask = (data, taskId) => {
  return axiosService.put(`${API_ENDPOINT}/${url}/${taskId}`, data);
};

export const deleteTask = (taskId) => {
  // console.log('quang', taskId)
  return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
};