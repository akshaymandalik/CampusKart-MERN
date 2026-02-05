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
import {ToastMessage} from "../components/toast"
import loadingGif from "../assets/loading.gif";
import { Link,useNavigate } from "react-router-dom";
import { signin } from "../services/auth.service";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [globalError, setGlobalError] = useState("");
  const [globalSuccess, setGlobalSuccess] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const [statusCode, setStatusCode] = useState(200);

  const [showPassword, setShowPassword] = useState(false);

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
    const result = await signin(formData);
    if (!result.success) {
      setGlobalError(result.response);
      setStatusCode(result.status);
      return;
    }
    setGlobalSuccess(result.response.success[0]);
    setFormData({ username: "", password: "" });
    setStatusCode(result.response.status);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate("/home");
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
                <h3 className="text-center mb-4">Sign In</h3>
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
                  </Form.Group>
                  <Button type="submit" variant="primary" className="w-100">
                    Sign In
                  </Button>
                  <div className="text-center mt-3">
                    {" "}
                    <small>
                      <Link to="/forgotpass">Forgot Password?</Link>
                    </small>
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

export default Signin;
