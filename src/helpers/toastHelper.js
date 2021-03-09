import { toast } from "react-toastify";

export const toastError = (error) => {
  let message = null;
  if (typeof error === "object" && error.message) {
    ({ message } = error);
  }
  if (message) {
    toast.error(message);
  }
};

export const toastSuccess = (message) => {
  if (typeof error === "object" && error.message) {
    toastSuccess(message);
  }
};
