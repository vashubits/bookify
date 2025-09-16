import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const RegisterPage = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLogin) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
    try {
      await firebase.signupUserWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error signing up. Check console.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div
            className="card p-4 shadow"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(to right, #f0f4ff, #ffffff)",
            }}
          >
            <h4
              className="text-center mb-4"
              style={{ color: "#1976d2", fontWeight: "600" }}
            >
              Create an Account
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-100 mb-3"
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
                Create Account
              </Button>
            </form>

            <div className="text-center mt-3">
              <span style={{ color: "#555", fontWeight: "500" }}>
                Already have an account?
              </span>
              <Button
                onClick={() => navigate("/login")}
                className="ms-2"
                style={{
                  background: "linear-gradient(135deg, #1976d2, #00bcd4)",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(135deg, #00bcd4, #1976d2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(135deg, #1976d2, #00bcd4)")
                }
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
