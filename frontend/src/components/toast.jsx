import { Toast, ToastContainer } from "react-bootstrap";
export const ToastMessage = ({ message, statusCode, onClose }) => {
  let variant;
  if (statusCode == 200) variant = "success";
  else variant = "danger";

  return (
    <>
      <ToastContainer position="top-end" className="p-3 h-75">
        <Toast
          bg={variant}
          show={true}
          onClose={onClose}
          delay={3000}
          autohide
          className="bg-opacity-75 p-1"
        >
          <Toast.Body className="text-white d-flex align-items-center fw-medium">
            <i
              className={`fa-solid ${
                variant === "success"
                  ? "fa-circle-check"
                  : "fa-circle-exclamation"
              } me-2`}
            ></i>
            {message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
