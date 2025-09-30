import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Items/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [hover, setHover] = useState(true);
  return (
    <div className="shop-category">
      <img className="shop-category-banner" src={props.banner} alt="" />
      <div className="shop-category-indexSort">
        <p>
          <span>Showing 1-12</span>
          out of 36 products
        </p>

        <button
          className="shop-category-sort"
          onMouseEnter={() => setHover(false)}
          onMouseLeave={() => setHover(true)}
        >
          <img src={dropdown_icon} alt="" />
          {hover ? "Sort by" : " In progress..."}
        </button>
      </div>
      <div className="shop-category-products">
        {all_product.map((item, i) => {
          if (
            props.category.trim().toLowerCase() ===
            item.category.trim().toLowerCase()
          ) {
            return (
              <Item
                key={i}
                image={item.image}
                name={item.name}
                new_price={item.new_price + " $"}
                old_price={item.old_price + " $"}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <button
        className="loading-more"
        onMouseEnter={() => setHover(false)}
        onMouseLeave={() => setHover(true)}
      >
        {hover ? "Explore more" : "In progress..."}
      </button>
    </div>
  );
};

export default ShopCategory;
