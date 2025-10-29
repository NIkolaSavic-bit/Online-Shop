import React, { useEffect, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { useParams } from "react-router-dom";
const ProductDisplay = (props) => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5145/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(`http://localhost:5145${data.image}`);
      })
      .catch((err) => console.error("Greska pri dohvatu proizvoda:", err));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const thumbnails = [
    `http://localhost:5145${product.image}`,
    `http://localhost:5145${product.image}`,
    `http://localhost:5145${product.image}`,
    `http://localhost:5145${product.image}`,
  ];

  return (
    <div className="product_display">
      <div className="product_display_left">
        <div className="product_display_image_list">
          {thumbnails.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              onClick={() => setMainImage(img)}
              style={{ cursor: "pointer" }}
            />
          ))}
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
          <h1>Select Size</h1>
          <div className="product_display_sizes">
            <div>L</div>
            <div>M</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <div className="add_to_cart_button">
          <button>Add to cart</button>
        </div>
        <p className="product_category">
          <span>Category:</span>Women, T-shirt
        </p>
        <p className="product_category">
          <span>Tags: </span>Moder, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
