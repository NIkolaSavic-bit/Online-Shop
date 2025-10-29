import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "..//../Context/AuthContext";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { CiUser } from "react-icons/ci";
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { userId, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <Link to="/">
          <p>SHOOPPER</p>
        </Link>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Shop
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to="/mens" style={{ textDecoration: "none", color: "black" }}>
            Men
          </Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to="/womens" style={{ textDecoration: "none", color: "black" }}>
            Women
          </Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" style={{ textDecoration: "none", color: "black" }}>
            Kids
          </Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {userId ? (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}

        <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">0</div>
        <div className="user">
          <CiUser
            size={40}
            onClick={() => navigate("/user")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
