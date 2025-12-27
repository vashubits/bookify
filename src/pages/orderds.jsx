import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Mail from "../components/mail";

const Orderds = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [Qty, setQty] = useState("1");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const firebase = useFirebase();
  const { id } = useParams();

  const handleOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await firebase.bookorder(name, email, Qty, id, phone, address,city,state,pincode);
      setOrderPlaced(true);
    } catch (err) {
      console.error("Order failed:", err);
      setOrderPlaced(false);
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      className="mt-5 p-4"
      style={{
        maxWidth: "600px",
        background: "linear-gradient(to right, #f0f4ff, #ffffff)",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <h2 className="mb-4 text-center" style={{ color: "#1976d2" }}>
        Place Your Order
      </h2>

      <Form onSubmit={handleOrder}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Your Mobile No."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your City"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your State"
            value={state}
            onChange={(e) => setstate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Pincode"
            value={pincode}
            onChange={(e) => setpincode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formQty">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="1"
            placeholder="Number Of Books"
            value={Qty}
            onChange={(e) => setQty(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100 mb-3"
          disabled={isSubmitting}
          style={{
            background: "linear-gradient(135deg, #00bcd4, #1976d2)",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            padding: "10px",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, #1976d2, #00bcd4)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, #00bcd4, #1976d2)")
          }
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </Button>
      </Form>

      {orderPlaced && (
        <Mail
          buyerName={name}
          buyerEmail={email}
          quantity={Qty}
          phone={phone}
          address={address}
          onMailDone={() => setIsSubmitting(false)}
        />
      )}
    </Container>
  );
};

export default Orderds;
