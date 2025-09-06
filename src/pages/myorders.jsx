import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const MyOrders = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    firebase.myorders(id)
      .then((snapshot) => {
        const orders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrderInfo(orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error.message);
      });
  }, [firebase, id]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Orders for Book ID: {id}</h2>

      {orderInfo.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {orderInfo.map(order => (
            <Col key={order.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Order by {order.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {order.email} <br />
                    <strong>Quantity:</strong> {order.Qty}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Order ID: {order.id}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyOrders;
