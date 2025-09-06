import { useFirebase } from '../context/firebase';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Booklistner = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [isbn, setisbn] = useState("");
  const firebase = useFirebase();
  const [imageurl, setimageurl] = useState("")
  const [owner, setowner] = useState("")
  const navigate = useNavigate();

 const handlesubmit = async(e)=>{
e.preventDefault();
 await firebase. handlecreatednewlisting(name,isbn , price,imageurl,owner).then(navigate("/")).catch((err)=>console.log(err))
 }

  return (
    <div className='container mt-5'>
      <Form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="bookName">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bookowner">
          <Form.Label>Book Owner</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Owner Name"
            value={owner}
            onChange={(e) => setowner(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookPrice">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookPrice">
          <Form.Label>ISBN NUMBER</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN Number"
            value={isbn}
            onChange={(e) => setisbn(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookPrice">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image Url"
            value={imageurl}
            onChange={(e) => setimageurl(e.target.value)}
          />
        </Form.Group>


        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default Booklistner;
