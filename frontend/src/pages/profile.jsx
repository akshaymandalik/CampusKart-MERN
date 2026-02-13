import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const Profile = () => {
  const fakeData = [
    {
      id: "1",
      name: "Used Honda City 2018",
      imgUrl: "https://via.placeholder.com/300x200",
      price: 550000,
      desc: "Well maintained car, single owner, campus pickup only.",
      postDate: "2024-01-12",
      category: "Cars",
    },
    {
      id: "2",
      name: "iPhone 12 (128GB)",
      imgUrl: "https://via.placeholder.com/300x200",
      price: 42000,
      desc: "Excellent condition, includes original charger.",
      postDate: "2024-02-05",
      category: "Electronics",
    },
    {
      id: "3",
      name: "Engineering Books Set",
      imgUrl: "https://www.mahindrafirstchoice.com/used-cars/pune",
      price: 1500,
      desc: "Data Structures, OS, DBMS – lightly used.",
      postDate: "2024-02-20",
      category: "Books",
    },
    {
      id: "4",
      name: "Engineering Books Set",
      imgUrl: "https://via.placeholder.com/300x200",
      price: 1500,
      desc: "Data Structures, OS, DBMS – lightly used.",
      postDate: "2024-02-20",
      category: "Books",
    },
    {
      id: "5",
      name: "Engineering Books Set",
      imgUrl: "https://via.placeholder.com/300x200",
      price: 1500,
      desc: "Data Structures, OS, DBMS – lightly used.",
      postDate: "2024-02-20",
      category: "Books",
    },
    {
      id: "6",
      name: "Engineering Books Set",
      imgUrl: "https://via.placeholder.com/300x200",
      price: 1500,
      desc: "Data Structures, OS, DBMS – lightly used.",
      postDate: "2024-02-20",
      category: "Books",
    },
    {
      id: "7",
      name: "Engineering Books Set",
      imgUrl: "https://via.placeholder.com/300x200",
      price: 1500,
      desc: "Data Structures, OS, DBMS – lightly used.",
      postDate: "2024-02-20",
      category: "Books",
    },
    {
      id: "8",
      name: "Engineering Books Set",
      imgUrl: "https://via.placeholder.com/300x200",
      price: 1500,
      desc: "Data Structures, OS, DBMS – lightly used.",
      postDate: "2024-02-20",
      category: "Books",
    },
  ];

  return (
    <Container fluid className="min-vh-100 d-flex border border-black">
      <div className="border border-black m-5 w-100">
        <Row className="border border-black">
          <div>
            {" "}
            <small className="">Popular Searches:</small>
            <small className="small"> search terms</small>
          </div>
          <small className="text-body-secondary">path</small>
        </Row>
        <Row className="border border-black">
          {" "}
          <Col md={3} className="border border-black">
            Filters
          </Col>
          <Col className="border border-black">
            <Row className="d-flex justify-content-between">
              {fakeData.map((item) => {
                return (
                  <Col md={4} key={item.id} className="mb-4">
                    <Card className="h-100 shadow-sm">
                      <Card.Header></Card.Header>
                      <Card.Img variant="top" src={item.imgUrl} />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text className="small text-muted">
                          {item.desc}
                        </Card.Text>
                        <h6>₹{item.price}</h6>
                        <small className="text-muted">
                          Posted on {item.postDate}
                        </small>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
