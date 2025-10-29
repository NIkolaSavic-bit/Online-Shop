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

    // Primer: dohvati korisnika i korpu sa backend-a
    const fetchUserData = async () => {
      try {
        const userRes = await axios.get(
          `http://localhost:5145/api/auth/${userId}`
        );
        setUserEmail(userRes.data.email);
        const email = userRes.data.email;
        const name = email.split("@")[0];
        const formatName= name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        setName(formatName);

        const cartRes = await axios.get(
          `http://localhost:5145/api/cart/${userId}`
        );
        setCartProducts(cartRes.data.products); // pretpostavljamo da backend vraća products
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userId) {
    return <p className="error" style={{fontSize:"30px", height:"100vh"}}>Morate biti prijavljeni da bi videli stranicu.</p>;
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
          {cartProducts.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.newPrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
