import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Bookview = () => {
   const param = useParams();
   const firebase = useFirebase();
   const navigate = useNavigate();


    
   
   const [data, setdata] = useState(null)
    useEffect(() => {
       firebase.viewdatabyid(param.id).then((value)=> setdata(value) )
     }, []);
     if(data==null){
        return <h1>Loading...</h1>
     }
    
     
  return (
    <div className='container mt-5 mx-auto'>
      <h1>{data.name}</h1>
   <img  style={{width:300, height:300 }} src={data.imageurl} alt=""  />
   <h2>Details</h2>
   <p>price: Rs. {data.price}</p>
   <p>ISBN Number: {data.isbn} </p>
   <h2>Owner Details</h2>
   <p>Name: {data.Owner}</p>
     <Button onClick={ (e)=> navigate(`/orders/${param.id}`)} variant="primary">Buy Book</Button>
   
    </div>
  )
}

export default Bookview
