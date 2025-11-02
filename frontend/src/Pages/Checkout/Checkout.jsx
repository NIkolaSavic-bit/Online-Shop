import React, { useContext, useEffect, useState } from "react";
import "./Checkout.css";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Checkout = () => {
  const { userId } = useContext(AuthContext);
  const [cartItem, setCartItem] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      return;
    }
    axios
      .get(`http://localhost:5145/api/cart/${userId}`)
      .then((res) => {
        setCartItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greska prilikom ucitavanja proizvoda:", err);
        setLoading(false);
      });
  }, [userId]);

  const total = cartItem?.reduce(
    (sum, item) => sum + (item.product?.newPrice || 0) * item.quantity,
    0
  );

  if (!userId) {
    return (
      <p> Morate biti prijavljeni da bi mogli da nastavite sa placanjem </p>
    );
  }

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="checkout_container">
      <h2>Checkout</h2>
      <hr />
      <ul>
        {cartItem.map((item) => (
          <li key={item.id}>
            <img
              src={`http://localhost:5145${item.product?.images[0]}`}
              alt=""
            />
            {"Naziv: " + item.product?.name} - {"Velicina: " + item.size} -{" "}
            {"Kolicina: " + item.quantity} ---
            {"Cena po proizvodu: " + item.product?.newPrice + " $"}
          </li>
        ))}
      </ul>
      <h3 className="total_price">Ukupan iznos: ${total.toFixed(2)}</h3>
      <div className="payment">
        <button onClick={() => alert("Placanje nije implementirano")}>
          Plati
        </button>
      </div>
    </div>
  );
};

export default Checkout;
