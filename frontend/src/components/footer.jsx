import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="bg-black text-light py-4 mt-5">
      <Container>
        <hr className="border-light opacity-25" />
        <Row>
          <Col className="text-center">
            © {new Date().getFullYear()} CampusKart. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
