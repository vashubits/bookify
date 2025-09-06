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
  const result =  await firebase.signinUserWithEmailAndPass(email,password)
    
    
    
}


  return (
    <div className='container mt-5'>
       <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  onChange={e =>setemail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  onChange={e =>setpassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
       Login
      </Button>
    </Form>
    <h1 className='mt-5 mb-5'  >OR</h1>
    <Button onClick={firebase.signinwithgoogle} variant='danger'>Signin with Google</Button>
    <h1 className='mt-5 mb-5'  >OR</h1>
     <Button onClick={()=>navigate('/register')} variant='danger'>Sign Up</Button>
    </div>
  )
}

export default LoginPage
