import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Button from "react-bootstrap/Button";
import { Row, Col, Container } from "react-bootstrap";

const Bookview = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .viewdatabyid(id)
      .then((value) => {
        setData(value);
        setLoading(false);
      })
      .catch(() => {
       
        setLoading(false);
      });
  }, [firebase, id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <h3 style={{ color: "#1976d2" }}>Loading...</h3>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-5">
        <h3 style={{ color: "#ff5252" }}>Book not found!</h3>
      </div>
    );
  }

  return (
    <Container
      className="mt-5 p-4"
      style={{
        background: "linear-gradient(to right, #f0f4ff, #ffffff)",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        maxWidth: "900px",
      }}
    >
      <Row className="align-items-center">
        <Col xs={12} md={5} className="text-center mb-3 mb-md-0">
          <img
            src={data.imageurl}
            alt={data.name}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "350px",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          />
        </Col>
        <Col xs={12} md={7}>
          <h2 style={{ color: "#1976d2", marginBottom: "15px" }}>
            {data.name}
          </h2>

          <div style={{ marginBottom: "15px" }}>
            <h5 style={{ color: "#0d47a1", marginBottom: "5px" }}>Book Details</h5>
            <p className="mb-1">Price: Rs. {data.price}</p>
            <p className="mb-1">ISBN: {data.isbn}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ color: "#0d47a1", marginBottom: "5px" }}>Owner Details</h5>
            <p className="mb-1">Name: {data.Owner}</p>
          </div>

          <Button
            onClick={() => navigate(`/orders/${id}`)}
            style={{
              background: "linear-gradient(135deg, #00bcd4, #1976d2)",
              border: "none",
              borderRadius: "10px",
              padding: "10px 25px",
              fontWeight: "600",
            }}
          >
            Buy Book
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Bookview;
