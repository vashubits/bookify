import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Signout = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .logout()
      .then(() => {
        setLoading(false);
        navigate("/"); 
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        setLoading(false);
      });
  }, [firebase, navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", background: "#f0f4ff" }}
    >
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p style={{ color: "#1976d2", marginTop: "15px" }}>Signing out...</p>
        </div>
      ) : (
        <p style={{ color: "#555" }}>Redirecting...</p>
      )}
    </div>
  );
};

export default Signout;
