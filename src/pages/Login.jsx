import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
const firebase = useFirebase();
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const navigate = useNavigate();


useEffect(() => {
      if(firebase.isLogin){
navigate("/");
      }
    }, [firebase,navigate])
const handlesubmit =async (e) =>{
    e.preventDefault();
     if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }
  const result =  await firebase.signinUserWithEmailAndPass(email,password)
    
    
    
}


  return (
     <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h4 className="text-center mb-4">Login</h4>
            <form onSubmit={handlesubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email"   onChange={e =>setemail(e.target.value)} value={email} placeholder="Enter email" />
              </div>
              <div className="mb-1">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"  onChange={e =>setpassword(e.target.value)} value={password} placeholder="Enter password" />
              </div>
                <div className="mb-3 text-end">
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => navigate('/register')}
                  style={{ color: '#5082a1fc' }}
                >
                  Forgot Password?
                </button>
              </div>
              
              <button type="submit" className="btn w-100" style={{ backgroundColor: '#5082a1fc', color: '#fff' }}>
                LOGIN
              </button>
            </form>
            
            <div className="text-center mb-2">
              <span>OR</span>
            </div>

            <Button
  className="w-100 mb-3"
  onClick={firebase.signinwithgoogle}
  style={{
    backgroundColor: '#5082a1fc',
    color: '#fff',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
  }}
>
  <img
    src="https://img.icons8.com/color/24/000000/google-logo.png"
    alt="Google icon"
    className="me-2"
    style={{ backgroundColor: 'white', borderRadius: '50%', padding: '2px' }}
  />
  Sign in with Google
</Button>

         <div className="mt-3 text-center">
  <span>
    Need an account? 
    <button 
      onClick={() => navigate('/register')} 
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
      Sign up
    </button>
  </span>
</div>

          </div> 
        </div>
      </div>
    </div>
  )
};

export default LoginPage ;