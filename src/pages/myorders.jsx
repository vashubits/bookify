import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

const MyOrders = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const [orderInfo, setOrderInfo] = useState([]);
  const [searchText, setSearchText] = useState("");
 
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await firebase.myorders(id);
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
           
        }));
        setOrderInfo(orders);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    if (id) fetchOrders();
  }, [firebase, id]);
 
 

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await firebase.deleteOrder(id, orderId);
      setOrderInfo((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };
   const handleapprove = async (orderId, newapprove) => {
    try {
      await firebase.updateapproveStatus(id, orderId, newapprove);
      setOrderInfo((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, isapprove: newapprove} : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await firebase.updateOrderStatus(id, orderId, newStatus);
      setOrderInfo((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const filteredOrders =
    searchText.trim() === ""
      ? orderInfo
      : orderInfo.filter(
          (order) =>
            order.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            order.email?.toLowerCase().includes(searchText.toLowerCase()) ||
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
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center" style={{ color: "#555" }}>
          {searchText ? "No orders match your search." : "No orders found."}
        </p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredOrders.map((order) => {
            const isDelivered = order.status === true;
            return (
              <Col key={order.id}>
                <Card
                  className="h-100 shadow-sm"
                  style={{
                    borderRadius: "12px",
                    background: isDelivered
                      ? "linear-gradient(to right, #e8f5e9, #ffffff)"
                      : "linear-gradient(to right, #fff3e0, #ffffff)",
                    border: isDelivered
                      ? "2px solid #4caf50"
                      : "2px solid #ff9800",
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        color: isDelivered ? "#2e7d32" : "#e65100",
                        fontWeight: "600",
                      }}
                    >
                      Order by {order.name}{" "}
                      <Badge bg={isDelivered ? "success" : "warning"} pill>
                        {isDelivered ? "Delivered" : "Pending"}
                      </Badge>
                    </Card.Title>
                    <Card.Text style={{ color: "#555", lineHeight: "1.5" }}>
                      <strong>Email:</strong> {order.email} <br />
                      <strong>Phone:</strong> {order.phone || "N/A"} <br />
                      <strong>Address:</strong> {order.address || "N/A"} <br />
                      <strong>City:</strong> {order.city || "N/A"} <br />
                      <strong>State:</strong> {order.state || "N/A"} <br />
                      <strong>PinCode:</strong> {order.pincode || "N/A"} <br />
                      <strong>Quantity:</strong> {order.Qty}
                    </Card.Text>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete Order
                    </Button>

                    <Button
                      variant={isDelivered ? "success" : "warning"}
                      size="sm"
                      className="ms-2"
                      onClick={() => handleStatusChange(order.id, !isDelivered)}
                    >
                      {isDelivered ? "Mark as Pending" : "Mark as Delivered"}
                    </Button>
                    <Button
                      variant={order.isapprove ? "success" : "warning"}
                      size="sm"
                      className="ms-2"
                      onClick={() => handleapprove(order.id,!order.isapprove)}
                    >
                      {order.isapprove ? "Approve" : " UnApprove"}
                    </Button>
                  </Card.Body>
                  <Card.Footer
                    className="text-muted"
                    style={{
                      backgroundColor: isDelivered ? "#c8e6c9" : "#ffe0b2",
                      fontWeight: "500",
                      textAlign: "center",
                      borderRadius: "0 0 12px 12px",
                    }}
                  >
                    Order ID: {order.id}
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default MyOrders;








