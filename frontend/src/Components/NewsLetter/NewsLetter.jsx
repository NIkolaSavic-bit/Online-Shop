import React, { useState } from "react";
import "./NewsLetter.css";
const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Unesite mail");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5145/api/newletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      setEmail("");
      //obrisi poruku
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Javila se grska!", err.message);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="newsletter">
      <h1>Get exclusive offers on your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {message && <p>{message}</p>}{" "}
    </div>
  );
};

export default NewsLetter;
