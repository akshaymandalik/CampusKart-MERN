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
import { ToastMessage } from "../components/toast";
import { Link } from "react-router-dom";
import { isUserExist } from "../services/auth.service";

const Forgotpass = () => {
  const [formData, setFormData] = useState({
    username: "",
    otp: "",
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [globalSuccess, setGlobalSuccess] = useState("");
  const [statusCode, setStatusCode] = useState(200);
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

  return (
    <>
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
            <h1 className="text-center m-5 text-light display-2">CampusKart</h1>
          </Col>
          <Col md={5} lg={4}>
            <Card className="shadow-sm p-2">
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
                      placeholder="Enter Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  {showOtpField && (
                    <Form.Group>
                      <Form.Label> Otp</Form.Label>
                      <Form.Control
                        type="text"
                        name="otp"
                        placeholder="Enter Otp"
                        value={formData.otp}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  )}
                  <div className="d-flex justify-content-between mt-3">
                    <Button as={Link} to="/signin" variant="danger">
                      Back
                    </Button>
                    {!showOtpField && (
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={showOtpField}
                      >
                        Submit{" "}
                      </Button>
                    )}
                    {showOtpField && (
                      <Button type="submit" variant="success">
                        Verify Otp
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
};

export default Forgotpass;
