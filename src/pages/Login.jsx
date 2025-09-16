import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const LoginPage = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await firebase.signinUserWithEmailAndPass(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh", background: "linear-gradient(to right, #f0f4ff, #ffffff)" }}
    >
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4" style={{ color: "#1976d2" }}>
          Login
        </h3>

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
              style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              required
            />
          </div>

          <div className="mb-1">
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
              style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              required
            />
          </div>

          <div className="mb-3 text-end">
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => navigate("/register")}
              style={{ color: "#1976d2" }}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              background: "linear-gradient(135deg, #00bcd4, #1976d2)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              padding: "10px 0",
              fontWeight: "600",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <div className="text-center mb-3">
          <span>OR</span>
        </div>

        <Button
          className="w-100 mb-3 d-flex align-items-center justify-content-center"
          onClick={firebase.signinwithgoogle}
          style={{
            background: "linear-gradient(135deg, #ff5252, #f44336)",
            color: "#fff",
            fontWeight: "500",
            border: "none",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <img
            src="https://img.icons8.com/color/24/000000/google-logo.png"
            alt="Google icon"
            className="me-2"
            style={{ backgroundColor: "white", borderRadius: "50%", padding: "2px" }}
          />
          Sign in with Google
        </Button>

        <div className="text-center mt-3">
          <span>
            Need an account?
            <button
              onClick={() => navigate("/register")}
              className="btn text-decoration-none ms-2"
              style={{
                background: "linear-gradient(135deg, #00bcd4, #1976d2)",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              Sign up
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
