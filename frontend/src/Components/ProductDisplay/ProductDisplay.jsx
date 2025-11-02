import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const ProductDisplay = (props) => {
  const { fetchCartCount } = useCart();
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [mainImage, setMainImage] = useState("");
  //uzimamo korisnika
  const { userId } = useContext(AuthContext);
  const [startIndex, setStartIndex] = useState(0);
  const THUMB_WINDOW = 4;
  const [selectedSize, setSelectedSize] = useState(""); // čuva izabranu veličinu

  useEffect(() => {
    fetch(`http://localhost:5145/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        // koristi prvu sliku iz niza kao glavnu
        if (data.productImages && data.productImages.length > 0) {
          setMainImage(
            `http://localhost:5145${data.productImages[0].imagePath}`
          );
        }
      })
      .catch((err) => console.error("Greska pri ucitavanju proizvoda:", err));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const allThumbs =
    product.productImages?.map(
      (img) => `http://localhost:5145${img.imagePath}`
    ) || [];

  const thumbnails = allThumbs.slice(startIndex, startIndex + THUMB_WINDOW);

  const canPrev = startIndex > 0;
  const canNext = startIndex + THUMB_WINDOW < allThumbs.length;

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Morate biti prijavljeni da dodate proizvod u korpu.");
      return;
    }
    if (!selectedSize) {
      alert("Morate izabrati veličinu pre dodavanja u korpu.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5145/api/cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Number(userId),
          productId: product.id,
          quantity: 1,
          size: selectedSize,
        }),
      });
      if (!res.ok) throw new Error("Neuspešno dodavanje proizvoda");

      fetchCartCount();

      alert("Proizvod dodat u korpu.");
      console.log("Proizvod dodat u korpu:", res);
    } catch (err) {
      console.error("Greska pri dodavanju proizvoda u korpu:", err);

      alert("Greska pri dodavanju proizvoda u korpu.");
    }
  };

  return (
    <div className="product_display">
      <div className="product_display_left">
        <div className="product_display_image_list">
          <button
            disabled={!canPrev}
            onClick={() => canPrev && setStartIndex((prev) => prev - 1)}
            className="thumb_nav_btn"
          >
            <FaArrowUp />
          </button>

          {thumbnails.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              onClick={() => setMainImage(img)}
              style={{ cursor: "pointer" }}
            />
          ))}

          <button
            disabled={!canNext}
            onClick={() => canNext && setStartIndex((prev) => prev + 1)}
            className="thumb_nav_btn"
          >
            <FaArrowDown />
          </button>
        </div>
        <div className="product_display_image">
          <img className="product_display_main_img" src={mainImage} alt="" />
        </div>
      </div>
      <div className="product_display_right">
        <h1>{product.name}</h1>
        <div className="product_display_right_star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="product_display_right_prices">
          <div className="old_price">${product.oldPrice}</div>
          <div className="new_price">${product.newPrice}</div>
        </div>
        <div className="product_display_right_description">
          Nesto o: {product.name}
        </div>
        <div className="product_display_right_size">
          <h1>Odaberite velicinu</h1>
          <div className="product_display_sizes">
            {product.productSizes?.map((ps) => (
              <button
                key={ps.size}
                disabled={ps.quantity === 0}
                className={selectedSize === ps.size ? "size_selected" : ""}
                onClick={() => setSelectedSize(ps.size)}
              >
                {ps.size} {ps.quantity === 0 ? "(Nema na stanju)" : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="add_to_cart_button">
          <button onClick={handleAddToCart} disabled={!selectedSize}>
            Dodaj u korpu
          </button>
        </div>
        <p className="product_category">
          <span>Kategorija: </span>Women, T-shirt
        </p>
        <p className="product_category">
          <span>Tagovi: </span>Moder, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
