import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { AuthContext } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { fetchCartCount } = useCart();
  const { userId } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5145/api/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greska prilikom ucitavanja proizvoda", err);
        setLoading(false);
      });
  }, [userId]);

  const handleRemove = async (id) => {
    if (!window.confirm("Da li želite da izbacite proizvod iz korpe?")) return;
    try {
      const res = await fetch(`http://localhost:5145/api/cart/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCartItems(cartItems.filter((item) => item.id !== id));
        fetchCartCount();
      }
    } catch (err) {
      console.error("Greška pri brisanju:", err);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(`http://localhost:5145/api/cart/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuantity),
      });
      if (!res.ok) {
        const errorMsg = await res.text();
        alert(errorMsg);
        return;
      }

      const updatedItem = await res.json();
      setCartItems((prev) =>
        prev.map((ci) =>
          ci.id === updatedItem.id
            ? { ...ci, quantity: updatedItem.quantity }
            : ci
        )
      );
      fetchCartCount();
    } catch (err) {
      console.error("Greška pri ažuriranju količine:", err);
    }
  };

  if (!userId)
    return (
      <div className="helpers">Morate biti prijavljeni da bi videli korpu</div>
    );
  if (loading) return <div className="helpers">Loading...</div>;
  if (cartItems.length === 0)
    return <div className="helpers">Vaša korpa je prazna</div>;

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.newPrice || 0) * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Vaša korpa</h2>
      <div className="cart-list">
        {cartItems.map((item) =>
          item.product ? (
            <div className="cart-item" key={item.id}>
              <img
                src={
                  item.product.images && item.product.images.length > 0
                    ? `http://localhost:5145${item.product.images[0]}`
                    : "/placeholder.png"
                }
                alt={item.product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p>Cena: ${item.product.newPrice}</p>
                <p>Velicina: {item.size}</p>
                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(item, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "20px" }}>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.product.MaxQuantity}
                  >
                    +
                  </button>
                </div>
                <p>
                  Ukupno: ${(item.product.newPrice * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                className="cart-remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                Ukloni
              </button>
            </div>
          ) : null
        )}
      </div>
      <div className="cart-total">
        <h3>Ukupan iznos: ${total.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Nastavi na plaćanje
        </button>
      </div>
    </div>
  );
};

export default Cart;
