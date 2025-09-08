import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { useFirebase } from "../context/firebase";
import { useParams, useNavigate } from "react-router-dom";

const Mail = ({ buyerName, buyerEmail, quantity }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const firebase = useFirebase();
  const param = useParams(); // book id

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

    const order = {
      order_id: param.id,          // template variable
      email: data.ownermail,       // template variable
      buyer_name: buyerName,
      buyer_email:"buyerEmail",
      book_title: data.name,
      quantity: quantity,
      owner_name: data.Owner
    };

    const SERVICE_ID = "service_qs4edfo";
    const TEMPLATE_ID = "template_k3fkt8o";
    const PUBLIC_KEY = "gh8w3mw3cx2eCrtop";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, order, PUBLIC_KEY)
      .then(() => {
        alert("Order Confirmed! 📩");
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
        alert("Failed to send email.");
      });
  };

  return (
    <button onClick={sendOrderMail} className="btn btn-primary" disabled={!data}>
      {data ? "Place Order" : "Loading..."}
    </button>
  );
};

export default Mail;
