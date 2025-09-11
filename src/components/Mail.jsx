import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { useFirebase } from "../context/firebase";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

const Mail = ({ buyerName, buyerEmail, quantity, onMailDone }) => {
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
      toast.error("❌ Book data not loaded yet.");
      return;
    }

    setSending(true);

    const Ownermail = {
      order_id: param.id,
      email: data.ownermail,
      buyer_name: buyerName,
      book_title: data.name,
      quantity: quantity,
      owner_name: data.Owner,
      buyer_email: buyerEmail,
    };

    const Customermail = {
      buyer_name: buyerName,
      book_title: data.name,
      quantity: quantity,
      buyer_email: buyerEmail,
      price: data.price,
    };

    const SERVICE_ID = "service_qs4edfo";
    const OwnerMail_ID = "template_k3fkt8o";
    const CustomerMail_ID = "template_m43szel";
    const PUBLIC_KEY = "gh8w3mw3cx2eCrtop";

    Promise.all([
      emailjs.send(SERVICE_ID, OwnerMail_ID, Ownermail, PUBLIC_KEY),
      emailjs.send(SERVICE_ID, CustomerMail_ID, Customermail, PUBLIC_KEY),
    ])
      .then(() => {
        setOrderPlaced(true);
        toast.success("🎉 Order Confirmed!");

        if (onMailDone) onMailDone();

        setTimeout(() => navigate("/"), 2000);
      })
      .catch(() => {
        toast.error("❌ Failed to send email.");
        if (onMailDone) onMailDone();
      })
      .finally(() => setSending(false));
  };

  return (
    <>
      
      <button
        onClick={sendOrderMail}
        className="btn btn-primary mt-3"
        disabled={!data || sending || orderPlaced}
      >
        {sending
          ? "Processing..."
          : orderPlaced
          ? "Order Placed"
          : data
          ? "Confirm Order"
          : "Loading..."}
      </button>
    </>
  );
};

export default Mail;
