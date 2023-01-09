import { toast } from "react-toastify";

const config = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const notify = (type, message) => {
  switch (type) {
    case "success":
      config.toastId = "success1";
      return toast.success(message, config);
    case "warning":
      config.toastId = "warning1";
      return toast.warn(message, config);
    case "error":
      config.toastId = "error1";
      return toast.error(message, config);
    case "info":
      config.toastId = "info1";
      return toast.info(message, config);
    default:
      config.toastId = "default1";
      return toast(message, config);
  }
};
