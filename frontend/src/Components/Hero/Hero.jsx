import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New arrivals only</h2>
        <div>
          <div className="hero-hand-icons">
            <p>New </p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-button" onClick={() => navigate("/mens")}>
          <FaArrowRight size={20} />
          <span> Latest Collection</span>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
