import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Bookcard = ({ id, name, Owner, price, isbn, imageurl, view }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center">
      <Card
        className="shadow-lg"
        style={{
          width: "18rem",
          borderRadius: "15px",
          overflow: "hidden",
          background: "linear-gradient(145deg, #e0f7fa, #ffffff)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 20px 30px rgba(0,0,0,0.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
        }}
      >
       
        <Card.Img
          variant="top"
          src={imageurl}
          alt={name}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "contain",
            background: "#f3f6f9",
            padding: "10px",
            transition: "transform 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        <Card.Body style={{ position: "relative", paddingBottom: "80px" }}>
          <Card.Title
            className="fw-bold text-primary text-truncate"
            title={name}
            style={{ fontSize: "1.2rem" }}
          >
            {name}
          </Card.Title>

          
          <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
            <strong>ISBN:</strong> {isbn || "N/A"}
          </p>

          
          <Card.Text style={{ color: "#333", fontSize: "0.95rem" }}>
            Owner: <strong>{Owner}</strong> <br />
            Price: <span className="text-success fw-bold">₹{price}</span>
          </Card.Text>

          <div
            style={{
              position: "absolute",
              bottom: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "85%",
            }}
          >
            <Button
              onClick={() => navigate(`/book/view/${id}`)}
              className="w-100"
              style={{
                background: "linear-gradient(135deg, #00bcd4, #1976d2)",
                border: "none",
                borderRadius: "10px",
                fontWeight: "600",
                padding: "10px 0",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #1976d2, #00bcd4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #00bcd4, #1976d2)";
              }}
            >
              {view}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Bookcard;
