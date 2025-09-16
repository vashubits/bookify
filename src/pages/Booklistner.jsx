import { useFirebase } from "../context/firebase";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Booklistner = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isbn, setIsbn] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [owner, setOwner] = useState("");

  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.handlecreatednewlisting(
        name,
        isbn,
        price,
        imageurl,
        owner
      );
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "80vh" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          background: "linear-gradient(145deg, #f0f4ff, #ffffff)",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#1976d2" }}>
          Add New Book
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="bookName">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="bookOwner">
            <Form.Label>Book Owner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Owner Name"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="bookPrice">
            <Form.Label>Book Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="bookIsbn">
            <Form.Label>ISBN Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ISBN Number"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="bookImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image URL"
              value={imageurl}
              onChange={(e) => setImageurl(e.target.value)}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{
              background: "linear-gradient(135deg, #00bcd4, #1976d2)",
              border: "none",
              borderRadius: "10px",
              fontWeight: "600",
              padding: "10px 0",
              transition: "all 0.3s",
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
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Booklistner;
