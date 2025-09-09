import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterPage = () => {
  const firebase = useFirebase();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLogin) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    await firebase.signupUserWithEmailAndPassword(email, password);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h4 className="text-center mb-4">Create an Account</h4>
            <form onSubmit={handlesubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={e => setemail(e.target.value)}
                  value={email}
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={e => setpassword(e.target.value)}
                  value={password}
                  placeholder="Enter password"
                />
              </div>

             

              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: '#5082a1fc', color: '#fff' }}
              >
                Create Account
              </button>
            </form>

         
            <div className="mt-3 text-center">
              <span>
                Already have an account? 
                <button
                  onClick={() => navigate('/login')}
                  className="btn text-decoration-none"
                  style={{
                    marginLeft: '5px',
                    backgroundColor: '#5082a1fc',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px'
                  }}
                >
                  Login
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
