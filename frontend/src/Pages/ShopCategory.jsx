import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
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
          
          const isUnavailable =
            item.sizes?.every((s) => s.quantity === 0) || !item.sizes;

          return (
            <div
              key={item.id}
              className={isUnavailable ? "item_unavailable" : ""}
              style={{ position: "relative" }}
            >
              <Item
                id={item.id}
                image={
                  item.images?.length > 0
                    ? `http://localhost:5145${item.images[0]}`
                    : "/placeholder.jpg"
                }
                name={item.name}
                new_price={item.newPrice + " $"}
                old_price={item.oldPrice + " $"}
              />
              {isUnavailable && (
                <div className="item_unavailable_text">Nema na stanju</div>
              )}
            </div>
          );
        })}
      </div>
      {visibleProductsCount < filterProducts.length && (
        <button className="loading-more" onClick={handleLoadMore}>
          Explore more
        </button>
      )}
    </div>
  );
};

export default ShopCategory;
