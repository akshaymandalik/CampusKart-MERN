import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Link, Routes, Route, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";
import { useEffect, useState } from "react";
import { Profile } from "./profile";
import image from "../assets/background.jpg";
import { ByModel, ByBudget, ByCity } from "./careranges";
export const Home = () => {
  const { setUsername } = useAuth();

  const [key, setKey] = useState("city");

  const enterpriseSolutions = [
    {
      id: "1",
      title: "AutoInspect",
      desc: "AutoInspect is India's first AI driven vehicle inspection platform",
      imgUrl: image,
    },
    {
      id: "2",
      title: "Indian Blue Book",
      desc: "AutoInspect is India's first AI driven vehicle inspection platform",
      imgUrl: image,
    },
    {
      id: "3",
      title: "eDiig Auctions",
      desc: "AutoInspect is India's first AI driven vehicle inspection platform",
      imgUrl: image,
    },
    {
      id: "4",
      title: "Yard Management Services",
      desc: "AutoInspect is India's first AI driven vehicle inspection platform",
      imgUrl: image,
    },
  ];
  const advantages = [
    {
      id: "1",
      desc: "Avail loans from 25+ financiers with up to 100% funding",
      imgUrl: image,
    },
    {
      id: "2",
      desc: "Get India's most comprehensive 2-year used car warranty",
      imgUrl: image,
    },
    {
      id: "3",
      desc: "Guaranteed buyback - No stress, No Hassle, Fair pricing",
      imgUrl: image,
    },
    {
      id: "4",
      desc: "Widest range of cars with 200+ inspection point check",
      imgUrl: image,
    },
  ];


  function getRandomProducts() {}

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <Container fluid className="min-vh-100">
      <Row className="pt-lg-5 mx-auto my-lg-5" style={{ maxWidth: "1200px" }}>
        <Col>
          <h1 className="display-4 fw-bold text-center">
            Drive Certified. Drive Confident.
          </h1>
          <p className="lead opacity-75 text-center">
            Explore quality-checked multi-brand used cars at the best
            prices.{" "}
          </p>
          <div className="d-flex justify-content-center">
            <Form className="d-flex border bg-dark rounded p-2 w-50">
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
                Sign up for YourFirstChoice
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="pt-lg-5 mx-auto my-lg-5" style={{ maxWidth: "1200px" }}>
        <Col>
          <h5 className="medium text-center mb-5">Our Enterprise Solutions</h5>

          <Row className="justify-content-center">
            {enterpriseSolutions.map((item) => (
              <Col
                key={item.id}
                lg={5}
                className="d-flex justify-content-center mb-4 mx-3"
                style={{ cursor: "pointer" }}
              >
                <Card className="w-100 shadow-lg">
                  <Card.Header className="text-center text-dark bg-success-subtle">
                    {item.title}
                  </Card.Header>
                  <Card.Body className="d-flex align-items-center">
                    <Card.Img
                      variant="top"
                      className="mx-auto d-block"
                      style={{ width: "150px" }}
                      src={item.imgUrl}
                    />

                    <Card.Text className=" medium lead text-left">
                      {item.desc}{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center">
            <Button
              variant="dark"
              as={Link}
              to="/services"
              className="bg-black medium lead"
              style={{ width: "150px" }}
            >
              Know More
            </Button>
          </Row>
        </Col>
      </Row>
      <Row className="pt-lg-5 mx-auto my-lg-5" style={{ maxWidth: "1200px" }}>
        <Col>
          <h5 className="medium text-center mb-5">Our Advantage</h5>

          <Row className="justify-content-center">
            {advantages.map((item) => (
              <Col
                key={item.id}
                md={3}
                className="d-flex justify-content-center mb-4"
                style={{ cursor: "pointer" }}
              >
                <Card className="w-100 shadow-lg rounded-4">
                  <Card.Body className="d-flex align-items-center">
                    <Card.Img
                      variant="top"
                      className="mx-auto d-block"
                      style={{ width: "100px" }}
                      src={item.imgUrl}
                    />

                    <Card.Text className="text-left">{item.desc} </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="pt-lg-5 mx-auto my-lg-5" style={{ maxWidth: "1200px" }}>
        <Col>
          <h5 className="medium text-center mb-5">
            Explore Our Range of Used Cars
          </h5>

          <Row className="justify-content-center shadow">
            <Card>
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mt-2"
              >
                <Tab eventKey="city" title="By City" />
                <Tab eventKey="model" title="By Model" />
                <Tab eventKey="budget" title="By Budget" />
              </Tabs>

              <Card.Body>
                {key === "city" && <ByCity />}
                {key === "model" && <ByModel />}
                {key === "budget" && <ByBudget />}
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
