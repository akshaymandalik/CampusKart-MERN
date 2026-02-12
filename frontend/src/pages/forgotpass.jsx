import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import bImage from "../assets/background.jpg";
import loadingGif from "../assets/loading.gif";
import { ToastMessage } from "../components/toast";
import { Link, useNavigate } from "react-router-dom";
import {
  isUserExist,
  updateUserPass,
  verifyOtp,
} from "../services/auth.service";

const Forgotpass = () => {
  const [formData, setFormData] = useState({
    username: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [showOtpField, setShowOtpField] = useState(false);

  const [showNewPassField, setShowNewPassField] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [globalSuccess, setGlobalSuccess] = useState("");
  const [statusCode, setStatusCode] = useState(200);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalError("");
    const result = await isUserExist(formData.username);
    if (!result.success) {
      setGlobalError(result.response);
      setStatusCode(result.status);
      return;
    }
    setShowOtpField(true);
  }
  async function handleOtp() {
    setGlobalError("");
    const result = await verifyOtp(formData.otp);

    if (!result.success) {
      setGlobalError(result.response);
      setStatusCode(result.status);
      return;
    }
    setShowNewPassField(true);
  }

  async function updatePassword() {
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    const result = await updateUserPass(formData);

    if (!result.success) {
      setGlobalError(result.response);
      setStatusCode(result.status);
    }
    setGlobalSuccess(result.response.success[0]);
    setFormData({ username: "", otp: "", password: "", confirmPassword: "" });
    setStatusCode(result.response.status);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate("/signin");
    }, 3000);
  }

  return (
    <>
      {
        <Modal
          className="bg-dark bg-opacity-75"
          show={loader}
          onHide={() => !loader && setLoader(false)}
          centered
          backdrop="static"
          keyboard={false}
          contentClassName="bg-transparent border-0 shadow-none "
        >
          <img src={loadingGif} alt="" />
        </Modal>
      }
      <Container fluid className="min-vh-100 d-flex">
        {globalError && (
          <ToastMessage
            message={globalError}
            statusCode={statusCode}
            onClose={() => setGlobalError("")}
          />
        )}
        {globalSuccess && (
          <ToastMessage
            message={globalSuccess}
            statusCode={statusCode}
            onClose={() => setGlobalSuccess("")}
          />
        )}
        <Row className="w-100 justify-content-center align-items-center">
          <Col lg={6}>
            <img src={bImage} alt="" width={550} height={500} />
          </Col>
          <Col md={5} lg={4}>
            <Card className="shadow p-2">
              <Card.Body>
                <h3 className="text-center mb-4">Forgot Password</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fs-6 text-dark text-opacity-50">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="username"
                      disabled={showOtpField}
                      placeholder="Enter Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {showOtpField && (
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-6 text-dark text-opacity-50">
                        Otp
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="otp"
                        disabled={showNewPassField}
                        placeholder="Enter Otp"
                        value={formData.otp}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  )}

                  {showNewPassField && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label className="fs-6 text-dark text-opacity-50">
                          New Password{" "}
                          <i
                            className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} `}
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(!showPassword)}
                          ></i>
                        </Form.Label>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter New Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="fs-6 text-dark text-opacity-50">
                          Confirm Password
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="confirmPassword"
                          placeholder="Re-Enter Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        {error && (
                          <small className="text-center text-danger m-1">
                            {error}
                          </small>
                        )}
                      </Form.Group>
                    </>
                  )}

                  <div className="d-flex justify-content-between mt-3">
                    <Button as={Link} to="/signin" variant="danger">
                      Back
                    </Button>
                    {!showOtpField && (
                      <Button type="submit" variant="primary">
                        Submit{" "}
                      </Button>
                    )}
                    {showOtpField && (
                      <Button
                        name="verifyotp"
                        variant="success"
                        disabled={showNewPassField}
                        onClick={handleOtp}
                      >
                        Verify Otp
                      </Button>
                    )}
                    {showNewPassField && (
                      <Button
                        name="verifyotp"
                        variant="primary"
                        onClick={updatePassword}
                      >
                        Update Password{" "}
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};;;

export default Forgotpass;
