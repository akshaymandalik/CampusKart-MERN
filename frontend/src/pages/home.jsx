import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import { Link, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";
import { useEffect, useState, useRef } from "react";
import { Profile } from "./profile";
export const Home = () => {
  const { setUsername } = useAuth();
  const [showCategories, setShowCategories] = useState(false);

  const generalRef = useRef(null);

  function getRandomProducts() {}

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <>
      {/* HERO */}
      <Container
        fluid
        className="d-flex align-items-center bg-black"
        style={{ minHeight: "80vh" }}
      >
        <Row className="w-100">
          <Col>
            <h1 className="display-4 fw-bold text-center text-white">
              Buy & Sell on Campus Easily
            </h1>
            <p className="lead opacity-75 text-center text-white">
              A trusted marketplace for students — fast, simple, secure.
            </p>
            <div className="d-flex justify-content-center">
              <Form className="d-flex border bg-light rounded p-2 w-50">
                <Form.Control
                  type="email"
                  name="username"
                  placeholder="Enter your email"
                  className="me-2"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />

                <Button variant="success" as={Link} to="/signup">
                  Sign up for CampusKart
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* FEATURES */}

      <Container fluid className="w-100">
        {
          <Modal
            show={showCategories}
            centered
            onHide={() => setShowCategories(false)}
            keyboard={true}
            className="bg-dark bg-transparent"
          >
            <Modal.Header closeButton>
              <Modal.Title>All Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
          </Modal>
        }
        <Row className="p-3 bg-black">
          <Col md={2}>
            <Button
              className="rounded-5"
              onClick={() => setShowCategories(true)}
            >
              <i className="fa-solid fa-bars m-2"></i>
              ALL CATEGORIES
            </Button>
          </Col>
          <Col>
            {[
              { category: "Cars", path: "/cars" },
              { category: "Electronics", path: "/electronics" },
            ].map((item) => (
              <Button
                key={item.path}
                variant="outline-light"
                as={Link}
                to={item.path}
                className="m-2 rounded-5"
                onClick={() =>
                  generalRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {item.category}
              </Button>
            ))}
          </Col>
        </Row>
        <Row ref={generalRef}>
          <Routes>
            <Route path="/cars" element={<Profile />}></Route>
          </Routes>
        </Row>
      </Container>
    </>
  );
};
