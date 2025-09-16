import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { Container, Row, Col, Form } from "react-bootstrap";
import Bookcard from "../components/Bookcard";

const Viewmybooks = () => {
  const firebase = useFirebase();
  const [myBooks, setMyBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (firebase.isLogin) {
      firebase
        .Viewmybooks()
        .then((bookSnapshot) => {
          if (bookSnapshot) {
            setMyBooks(bookSnapshot.docs);
          }
        })
        .catch((error) => {
          console.error("Error fetching my books:", error);
        });
    }
  }, [firebase]);

  const filteredBooks = myBooks.filter((book) =>
    book.data().name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container
      className="mt-5 py-4"
      style={{
        minHeight: "80vh",
        background: "linear-gradient(to right, #f0f4ff, #ffffff)",
        borderRadius: "15px",
        padding: "30px",
      }}
    >
      <h3 className="text-center mb-4" style={{ color: "#1976d2" }}>
        My Books
      </h3>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search your books..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            borderRadius: "10px",
            padding: "12px",
            border: "1px solid #1976d2",
          }}
        />
      </Form>

      <Row className="g-4 justify-content-center">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
              <Bookcard
                id={`myorders/${book.id}`}
                view="My Orders"
                {...book.data()}
              />
            </Col>
          ))
        ) : (
          <p className="text-center" style={{ color: "#555" }}>
            {searchText ? "No books match your search." : "You have not added any books yet."}
          </p>
        )}
      </Row>
    </Container>
  );
};

export default Viewmybooks;
