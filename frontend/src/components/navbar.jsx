import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function AppNavbar() {
  const menuOptions = [
    { id: "1", name: "Home", path: "/" },
    { id: "2", name: "Enterprise Services", path: "/services" },
    { id: "3", name: "Buy Used Cars", path: "/cars" },
  ];

  return (
    <>
      {/* TOP NAVBAR */}
      <Navbar
        bg="warning"
        variant="light"
        expand="lg"
        sticky="top"
        className="py-2"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="display-1">
            YourFirstChoice
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto gap-3">
              <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* SECONDARY MENU BAR */}
      <Container fluid className="bg-black">
        <Row className="py-3">
          <Col>
            <ul className="d-flex justify-content-center gap-4 list-unstyled m-0">
              {menuOptions.map((option) => (
                <li key={option.id}>
                  <NavLink
                    to={option.path}
                    className={({ isActive }) =>
                      `text-white text-decoration-none ${
                        isActive ? "fw-bold border-bottom pb-1" : ""
                      }`
                    }
                  >
                    {option.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AppNavbar;
