import React from "react";
import { Link } from "react-router-dom";
import "./Company.css"

const Company = () => {
  return (
    <div className="company">
      <div className="container">
        <h1>Company</h1>
        <p>
          Founded in 2010, our company has grown from a small startup into a
          globally recognized leader in technology and innovation. Our mission
          is to provide solutions that make life easier, more efficient, and
          more enjoyable for our clients. We believe in a culture of
          collaboration, creativity, and integrity, which is reflected in every
          product and service we deliver. With a team of dedicated professionals
          from diverse backgrounds, we continuously strive to push the
          boundaries of what is possible. Our commitment to excellence has
          earned us numerous awards and long-term partnerships with industry
          leaders around the world.
        </p>
        <p>
          We value transparency, sustainability, and a customer-first approach.
          Our teams work tirelessly to ensure that every client receives the
          attention and innovation they deserve. Through ongoing research,
          development, and community engagement, we aim to make a lasting
          positive impact in the industry and society.
        </p>
      </div>
    </div>
  );
};

export default Company;
