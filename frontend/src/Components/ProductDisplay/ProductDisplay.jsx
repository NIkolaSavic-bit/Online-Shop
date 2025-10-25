import React from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
const ProductDisplay = (props) => {
  const { product } = props;
  const [mainImage, setMainImage] = React.useState(product.image);
  if (!product) {
    return <div className="product_display_loading">Loading product...</div>;
  }
  const thumbnails = [
    product.image,
    "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
    product.image,
    product.image,
    product.image,
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
          <div className="old_price">${product.old_price}</div>
          <div className="new_price">${product.new_price}</div>
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
