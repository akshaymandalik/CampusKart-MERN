import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Signin from "./signin";
import { signup } from "../../services/signup.service";
import { ToastMessage } from "../../components/toast";
import { validateUserSchema } from "../../validations/auth.validation";
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
    const response = await signup(formData);

    if (response.error) {
      setGlobalError(response.message);
      setStatusCode(response.status);
      return;
    }
    setGlobalSuccess(response.message);
    setFormData({ username: "", password: "", confirmPassword: "" });
    setStatusCode(response.status);
    navigate("/signin");
  }

  return (
    <>
      <Container
        fluid
        className="min-vh-100 d-flex align-items-center bg-light"
      >
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
          <Col md={5} lg={4}>
            <Card className="shadow-sm p-2">
              <Card.Body>
                <h3 className="text-center mb-4">Create Account</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fs-6 text-dark text-opacity-50">
                      Username
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
                  <Button type="submit" variant="primary">
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