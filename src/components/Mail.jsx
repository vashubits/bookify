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

    // Mail for Store Owner
    const ownerMail = {
      order_id: param.id,
      email: data.ownermail,
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      book_title: data.name,
      quantity: quantity,
      owner_name: data.Owner,
    };

    // Mail for Customer
    const customerMail = {
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      book_title: data.name,
      quantity: quantity,
      price: data.price || "N/A", // agar price stored hai to
    };

    const SERVICE_ID = "service_qs4edfo";
    const OWNER_TEMPLATE = "template_k3fkt8o";    // Owner ke liye template
    const CUSTOMER_TEMPLATE = "template_m43szel";  // Customer ke liye naya template banao
    const PUBLIC_KEY = "gh8w3mw3cx2eCrtop";

    // 1. Mail to Owner
  emailjs.send(SERVICE_ID, OWNER_TEMPLATE, ownerMail, PUBLIC_KEY)
  .then(() => {
    console.log("Owner mail sent ✅");
    console.log("Sending customer mail...");
    return emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE, customerMail, PUBLIC_KEY);
  })
  .then(() => {
    console.log("Customer mail sent ✅");
    alert("Order Confirmed! 📩");
    navigate("/");
  })
  .catch((err) => {
    console.error("Mail failed:", err);
    alert("Some emails failed.");
  });
  };

  return (
    <button onClick={sendOrderMail} className="btn btn-primary" disabled={!data}>
      {data ? "Place Order" : "Loading..."}
    </button>
  );
};

export default Mail;
