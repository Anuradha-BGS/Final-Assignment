import { toast } from "react-toastify";

export const createNotification = (type: string, msg: string) => {
  if (type === "info") {
    toast.info(msg);
  } else if (type === "success") {
    toast.success(msg);
  } else if (type === "warning") {
    toast.warn(msg);
  } else {
    toast.error(msg);
  }
};
