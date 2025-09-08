import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Mail from "../components/mail";

const Orderds = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [Qty, setQty] = useState("1");
  const [orderPlaced, setOrderPlaced] = useState(false); // 🔹 NEW STATE

  const firebase = useFirebase();
  const param = useParams();

  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      const value = await firebase.bookorder(name, email, Qty, param.id);
      
      setOrderPlaced(true); // 🔹 Trigger Mail component
    } catch (err) {
      
      setOrderPlaced(false);
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleOrder}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicQty">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            onChange={(e) => setQty(e.target.value)}
            value={Qty}
            type="number"
            min="1"
            placeholder="Number Of Books"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Place Order
        </Button>
      </Form>

      {/* 🔹 Show Mail only after order is placed */}
      {orderPlaced && (
        <Mail buyerName={name} buyerEmail={email} quantity={Qty} />
      )}
    </div>
  );
};

export default Orderds;
