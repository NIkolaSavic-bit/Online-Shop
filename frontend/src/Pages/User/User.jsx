// src/Pages/UserPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import "./User.css";

const User = () => {
  const { userId } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!userId) return;

    // dohvati korisnika i korpu sa backend-a
    const fetchUserData = async () => {
      try {
        const userRes = await axios.get(
          `http://localhost:5145/api/auth/${userId}`
        );
        setUserEmail(userRes.data.email);
        const email = userRes.data.email;
        const name = email.split("@")[0];
        //cisti brojeve
        const clean = name.replace(/[0-9]/g, "");
        //deli ime ako na dva ako je razdvojeno tackom ili donjom crtom
        const parts = clean.split(/[ ._]/);
        const formatName = parts
          .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
          .join(" ");
        setName(formatName);

        const cartRes = await axios.get(
          `http://localhost:5145/api/cart/${userId}`
        );
        setCartProducts(cartRes.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userId) {
    return (
      <p className="error" style={{ fontSize: "30px", height: "100vh" }}>
        Morate biti prijavljeni da bi videli korisnicki nalog.
      </p>
    );
  }

  return (
    <div className="main-container">
      <h1 className="user_page">Korisnicka stranica</h1>
      <p className="user_mail">
        <strong>Email:</strong> {userEmail}
      </p>
      <p className="user_name">
        <strong>Ime :</strong> {name}
      </p>

      <h2 className="cart_products">Proizvodi u korpi</h2>

      <hr />
      {!cartProducts || cartProducts.length === 0 ? (
        <p className="cart_items">Korpa je prazna</p>
      ) : (
        <ul>
          {cartProducts.map((item) => (
            <li key={item.id}>
              <img
                src={`http://localhost:5145${item.product.image}`}
                alt="Loading image...."
               
              />
              {item.product.name} - ${item.product.newPrice} (Količina:{" "}
              {item.quantity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
