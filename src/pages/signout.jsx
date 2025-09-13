import React, { useEffect } from 'react'
import { useFirebase } from '../context/firebase'
import { useNavigate } from 'react-router-dom';

const signout = () => {
    const navigate = useNavigate();
    const firebase = useFirebase();
    useEffect(() => {
      firebase.logout().then(navigate("/"));
    }, [])
    
  return (
    <div>
      
    </div>
  )
}

export default signout
