import React, { useContext, useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Items/Item";

const ShopCategory = (props) => {
  const [hover, setHover] = useState(true);
  const [products, setProducts] = useState([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(6);

  useEffect(() => {
    fetch("http://localhost:5145/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const filterProducts = products.filter(
    (item) =>
      item.category.trim().toLowerCase() === props.category.trim().toLowerCase()
  );
  const visibleProducts = filterProducts.slice(0, visibleProductsCount);

  const handleLoadMore = () => {
    setVisibleProductsCount((prevVisibleProducts) => prevVisibleProducts + 6);
  };
  return (
    <div className="shop-category">
      <img className="shop-category-banner" src={props.banner} alt="" />
      <div className="shop-category-indexSort">
        <p>
          <span>Showing {visibleProducts.length} </span>
          of {filterProducts.length} products
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
        {visibleProducts.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              image={`http://localhost:5145${item.image}`}
              name={item.name}
              new_price={item.newPrice + " $"}
              old_price={item.oldPrice + " $"}
            />
          );
        })}
      </div>
      {visibleProductsCount < filterProducts.length && (
        <button
          className="loading-more"
          onClick={handleLoadMore}
          onMouseEnter={() => setHover(false)}
          onMouseLeave={() => setHover(true)}
        >
          {hover ? "Explore more" : "In progress..."}
        </button>
      )}
    </div>
  );
};

export default ShopCategory;
