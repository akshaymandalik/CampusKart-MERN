import { Toast, ToastContainer } from "react-bootstrap";
export const ToastMessage = ({ message, statusCode, onClose }) => {
  let variant;
  if (statusCode == 200) variant = "success";
  else if (statusCode == 409) variant = "warning";
  else if (statusCode == 500) variant = "danger";

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast bg={variant} show={true} onClose={onClose} delay={3000} autohide>
          <Toast.Body className="text-white d-flex align-items-center">
            <i
              className={`fa-solid ${
                variant === "success"
                  ? "fa-circle-check"
                  : variant=="warning"?"fa-circle-exclamation":"fa-circle-x"
              } me-2`}
            ></i>
            {message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
