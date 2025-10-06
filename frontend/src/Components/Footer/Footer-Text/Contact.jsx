import React from "react";
import "./Company.css"; // možeš zadržati isti CSS za centriranje

const Contact = () => {
  return (
    <div className="company">
      <div className="container">
        <h1>Contact</h1>
        <p>
          We welcome inquiries, partnerships, and feedback from our clients and
          stakeholders. You can reach us via email at{" "}
          <a
            href="mailto:savicmnikola1912@gmail.com"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            savicmnikola1912@gmail.com
          </a>{" "}
          or by phone at{" "}
          <span style={{ fontWeight: "700", color: "black" }}>
            +387 (66) 489-060
          </span>
          .
        </p>
        <p>
          Our customer service team is available Monday through Friday to answer
          questions, provide support, and guide you through our products and
          services. Additionally, you can visit any of our global offices to
          meet with our team in person. Whether you’re a potential client, a
          partner, or simply curious about our work, we look forward to
          connecting with you and exploring opportunities to collaborate.
        </p>
      </div>
    </div>
  );
};

export default Contact;
