import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import Bookcard from "../components/Bookcard";
import { Container, Row, Col } from "react-bootstrap";

const Homepage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    firebase.listallbooks().then((books) => {
      setBooks(books.docs);
    });
  }, [firebase]);

  const filteredBooks =
    searchText.trim() === ""
      ? books
      : books.filter((book) =>
          book.data().name.toLowerCase().includes(searchText.toLowerCase())
        );

  return (
    <Container className="mt-4">
      <div className="mb-4 d-flex">
        <input
          type="text"
          placeholder="Enter book name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="form-control me-2 border border-primary shadow-sm rounded-pill px-3 py-2"
          style={{
            transition: "0.3s",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 0 10px rgba(0,123,255,0.5)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 5px rgba(0,0,0,0.1)")
          }
        />
      </div>

      <Row className="g-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
              <Bookcard id={book.id} view="View" {...book.data()} />
            </Col>
          ))
        ) : (
          <p className="text-center" style={{ color: "#555" }}>
            {searchText
              ? "No books match your search."
              : "No books available at the moment."}
          </p>
        )}
      </Row>
    </Container>
  );
};

export default Homepage;
