import { Container, Row, Col, Card } from "react-bootstrap";
import {Link} from "react-router-dom"
import img from "../assets/background.jpg";
export const ByCity = () => {
  const cityData = [
    {
      id: "1",
      title: "Used Cars In Chennai",
      imgUrl: img,
    },
    {
      id: "2",
      title: "Used Cars In Mumbai",
      imgUrl: img,
    },
    {
      id: "3",
      title: "Used Cars In Banglore",
      imgUrl: img,
    },
    {
      id: "4",
      title: "Used Cars In Kolkata",
      imgUrl: img,
    },
    {
      id: "5",
      title: "Used Cars In Delhi",
      imgUrl: img,
    },
    {
      id: "6",
      title: "User Cars In Hyderabad",
      imgUrl: img,
    },
  ];

  return (
    <Container>
      <Row>
        {cityData?.map((city) => {
          return (
            <Col key={city.id}>
              <Card style={{ cursor: "pointer" }} className="text-center text-decoration-none" as={Link} to="/cars">
                <Card.Img variant="top" src={city.imgUrl} />
                <Card.Text >
                  {city.title}
                </Card.Text>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export const ByModel = () => {
  return <>By Brand</>;
};

export const ByBudget = () => {
  return <>By Budget</>;
};
