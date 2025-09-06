import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const Orderds = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [Qty, setQty] = useState("1");

  const navigate = useNavigate();
  const firebase = useFirebase();
  const param = useParams();

  const handleOrder = async (e) => {
    e.preventDefault();
    await firebase.bookorder(name, email, Qty, param.id);
    alert("Order Confirm");
  };

  return (
    <div className='container mt-5'>
      <Form onSubmit={handleOrder}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicQty">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            onChange={(e) => setQty(e.target.value)}
            value={Qty}
            type="number"
            placeholder="Number Of Books"
          />
        </Form.Group>

        <Button onClick={() => navigate(`/`)} variant="primary" type="submit">
          Order
        </Button>
      </Form>
    </div>
  );
};

export default Orderds;
