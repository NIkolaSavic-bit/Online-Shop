import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
import instagra_icon from "../Assets/instagram_icon.png";
import pintester_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>
          <Link
            to="/Company"
            style={{ color: "black", textDecoration: "none" }}
          >
            Company
          </Link>
        </li>
        <li>
          <Link
            to="/Products"
            style={{ color: "black", textDecoration: "none" }}
          >
            Products
          </Link>
        </li>
        <li>  <Link
            to="/Offices"
            style={{ color: "black", textDecoration: "none" }}
          >
            Offices
          </Link></li>
        <li>
          {" "}
          <Link to="/About" style={{ color: "black", textDecoration: "none" }}>
            About
          </Link>
        </li>
        <li>
          <Link
            to="/Contact"
            style={{ color: "black", textDecoration: "none" }}
          >
            Contact
          </Link>
        </li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagra_icon} alt="" />
          </a>
        </div>{" "}
        <div className="footer-icons-container">
          <a
            href="https://www.pinterst.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={pintester_icon} alt="" />
          </a>
        </div>{" "}
        <div className="footer-icons-container">
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={whatsapp_icon} alt="" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @2023 - All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
