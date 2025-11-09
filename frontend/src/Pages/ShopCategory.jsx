import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import Item from "../Components/Items/Item";
import Banner from "../Banner/Banner";

const ShopCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(4);
  const [sortOption, setSortOption] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:5145/api/products/category/${props.category}?sort=${sortOption}`
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Greška pri učitavanju proizvoda:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOption, props.category]);

  const visibleProducts = products.slice(0, visibleProductsCount);

  const handleLoadMore = () => {
    setVisibleProductsCount((prev) => prev + 4);
  };

  // Pronađi najnoviji proizvod po createdAt
  const newestProductId = products.length
    ? products.reduce((prev, curr) =>
        new Date(curr.createdAt) > new Date(prev.createdAt) ? curr : prev
      ).id
    : null;

  function isNewProduct(createdAt) {
    return Date.now() - new Date(createdAt).getTime() <= 24 * 60 * 60 * 1000;
  }

  return (
    <div className="shop-category">
      <Banner category={props.category} />
      <div className="shop-category-indexSort">
        <p>
          <span>Showing {visibleProducts.length} </span>
          of {products.length} products
        </p>

        <select
          className="shop-category-sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_asc">Cena: naviše</option>
          <option value="price_desc">Cena: naniže</option>
          <option value="date_asc">Datum dodavanja: najstariji</option>
          <option value="date_desc">Datum dodavanja: najnoviji</option>
        </select>
      </div>

      <div className="shop-category-products">
        {visibleProducts.map((item) => {
          const isUnavailable =
            item.sizes?.every((s) => s.quantity === 0) || !item.sizes;
          const isNew = isNewProduct(item.createdAt);

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
              {isNew && <div className="item_new_text">NOVO</div>}
            </div>
          );
        })}
      </div>

      {visibleProductsCount < products.length && (
        <button className="loading-more" onClick={handleLoadMore}>
          Explore more
        </button>
      )}
    </div>
  );
};

export default ShopCategory;
