import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const MyOrders = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const [orderInfo, setOrderInfo] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    firebase
      .myorders(id)
      .then((snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrderInfo(orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error.message);
      });
  }, [firebase, id]);

  const filteredOrders =
    searchText.trim() === ""
      ? orderInfo
      : orderInfo.filter(
          (order) =>
            order.name.toLowerCase().includes(searchText.toLowerCase()) ||
            order.email.toLowerCase().includes(searchText.toLowerCase()) ||
            (order.phone && order.phone.includes(searchText))
        );

  return (
    <Container className="mt-4">
      <h2
        className="mb-4 text-center"
        style={{
          color: "#1976d2",
          fontWeight: "600",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        Orders for Book ID: {id}
      </h2>

      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="form-control w-50 border border-primary shadow-sm rounded-pill px-3 py-2"
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

      {filteredOrders.length === 0 ? (
        <p className="text-center" style={{ color: "#555" }}>
          {searchText ? "No orders match your search." : "No orders found."}
        </p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredOrders.map((order) => (
            <Col key={order.id}>
              <Card
                className="h-100 shadow-sm"
                style={{
                  borderRadius: "12px",
                  background: "linear-gradient(to right, #f0f4ff, #ffffff)",
                }}
              >
                <Card.Body>
                  <Card.Title
                    style={{ color: "#0d47a1", fontWeight: "600" }}
                  >
                    Order by {order.name}
                  </Card.Title>
                  <Card.Text style={{ color: "#555", lineHeight: "1.5" }}>
                    <strong>Email:</strong> {order.email} <br />
                    <strong>Phone:</strong> {order.phone || "N/A"} <br />
                    <strong>Address:</strong> {order.address || "N/A"} <br />
                    <strong>Quantity:</strong> {order.Qty}
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  className="text-muted"
                  style={{
                    backgroundColor: "#e3f2fd",
                    fontWeight: "500",
                    textAlign: "center",
                    borderRadius: "0 0 12px 12px",
                  }}
                >
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
