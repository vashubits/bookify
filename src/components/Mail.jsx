import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { useFirebase } from "../context/firebase";
import { useParams, useNavigate } from "react-router-dom";

const Mail = ({ buyerName, buyerEmail, quantity }) => {
  const [data, setData] = useState(null);
  const [sending, setSending] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); 
  const navigate = useNavigate();
  const firebase = useFirebase();
  const param = useParams(); 

  useEffect(() => {
    if (param.id) {
      firebase.viewdatabyid(param.id).then((value) => setData(value));
    }
  }, [firebase, param.id]);

  const sendOrderMail = () => {
    if (!data) {
      alert("Book data not loaded yet.");
      return;
    }

    setSending(true); 

    const order = {
      order_id: param.id,
      email: data.ownermail,
      buyer_name: buyerName,
      book_title: data.name,
      quantity: quantity,
      owner_name: data.Owner
    };

    const SERVICE_ID = "service_qs4edfo";
    const TEMPLATE_ID = "template_k3fkt8o";
    const PUBLIC_KEY = "gh8w3mw3cx2eCrtop";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, order, PUBLIC_KEY)
      .then(() => {
        setOrderPlaced(true); 
        alert("Order Confirmed! 📩");
        navigate("/");
      })
      .catch((err) => {
        
        alert("Failed to send email.");
      })
      .finally(() => setSending(false));
  };

  return (
    <button 
      onClick={sendOrderMail} 
      className="btn btn-primary mt-3" 
      disabled={!data || sending || orderPlaced} 
    >
      {sending ? "Processing..." : orderPlaced ? "Order Placed" : data ? "Confirm Order" : "Loading..."}
    </button>
  );
};

export default Mail;