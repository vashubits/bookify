import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import Bookcard from '../components/Bookcard';
import { Container, Row, Col } from 'react-bootstrap';

const Homepage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listallbooks().then((books) => {
      setBooks(books.docs);
    });
  }, [firebase]);

  return (
    <Container className="mt-4">
      <Row className="g-3">
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
            <Bookcard id={book.id} view="View" {...book.data()} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Homepage;
