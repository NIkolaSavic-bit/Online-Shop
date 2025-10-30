import React from "react";
import "./Offers.css";
import exclusive_imge from "../Assets/exclusive_image.png";
import { useNavigate } from "react-router-dom";
const Office = () => {
  const navigate = useNavigate();

  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>Only on best sellers product</p>
        <button onClick={() => navigate("/womens")}>Check now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_imge} alt="" />
      </div>
    </div>
  );
};

export default Office;
