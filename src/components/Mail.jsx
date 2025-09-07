// Mail.jsx
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { useFirebase } from "../context/firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Mail = ({ buyerName, buyerEmail, quantity }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const firebase = useFirebase();
  const param = useParams(); // book id from route

  useEffect(() => {
    if (param.id) {
      firebase.viewdatabyid(param.id).then((value) => setData(value));
    }
  }, [firebase, param.id]);
  
console.log(data)
  const sendOrderMail = () => {
    if (!data) {
      alert("Book data not loaded yet.");
      return;
    }

    const order = {
  book_title: data.name,
  buyer_name: buyerName,
  buyer_email: buyerEmail,
  quantity: quantity,
  owner_name: data.Owner, // yaha book owner ka name set karo
  email: data.ownermail       // template me {{email}} ke liye
};

    emailjs
      emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  order,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
      .then(() => {
        
        alert("Order Confirm");
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
        alert("Failed to send email.");
      });
  };

  return (
    <button  onClick={sendOrderMail} className="btn btn-primary" disabled={!data}>
      {data ? "Place Order" : "Loading..."}
    </button>
  );
};

export default Mail;
