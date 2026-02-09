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
  Spinner,
} from "react-bootstrap";
import loadingGif from "../assets/loading.gif";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/auth.service";
import { ToastMessage } from "../components/toast";
import { validateUserSchema } from "../validations/auth.validation";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    validationErrors: {},
    passMatchError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [globalSuccess, setGlobalSuccess] = useState("");
  const [statusCode, setStatusCode] = useState(200);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    const validationResult = validateUserSchema(updatedFormData);
    setError({ ...error, validationErrors: validationResult.errors });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError({
      validationErrors: {},
      passMatchError: "",
    });
    setGlobalError("");
    if (formData.password !== formData.confirmPassword) {
      setError({ ...error, passMatchError: "Passwords do not match!" });
      return;
    }
    const result = await signup(formData);
    
    if (!result.success) {
      setGlobalError(result.response);
      setStatusCode(result.status);
      return;
    }
    
    setGlobalSuccess(result.response.success[0]);
    setFormData({ username: "", password: "", confirmPassword: "" });
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
      <Container fluid className="min-vh-100 d-flex align-items-center bg-dark">
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

        <Row className="w-100 justify-content-center">
          <Col lg={6} className="d-flex align-items-center">
            <h1 className="text-center m-5 text-light display-1">CampusKart</h1>
          </Col>
          <Col md={5} lg={4}>
            <Card className="shadow-sm p-2">
              <Card.Body>
                <h3 className="text-center mb-4">Create Account</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fs-6 text-dark text-opacity-50">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    {error.validationErrors.username?.length > 0 && (
                      <small className="text-center text-danger m-1">
                        {error.validationErrors.username[0]}
                      </small>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fs-6 text-dark text-opacity-50">
                      Password{" "}
                      <i
                        className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} `}
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      ></i>
                    </Form.Label>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {error.validationErrors.password?.map((err, index) => (
                      <small key={index} className="text-danger m-1 d-block">
                        {err}
                      </small>
                    ))}
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
                    {error.passMatchError && (
                      <small className="text-center text-danger m-1">
                        {error.passMatchError}
                      </small>
                    )}
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                    disabled={error.validationErrors.password?.length > 0}
                  >
                    Sign Up
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <small>
                    Already have an account? <Link to="/signin">Signin</Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
