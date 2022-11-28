import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const Toast = () => {
  return <StyledToastContainer />;
};

export default Toast;

const StyledToastContainer = styled(ToastContainer).attrs({
  position: "bottom-center",
  autoClose: 3000,
  newestOnTop: true,
  draggable: true,
  closeOnClick: true,
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  theme: "dark",
})``;
