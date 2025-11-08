import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Item from "../../Items/Item";
import "./SearchResults.css";
const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(
      `http://localhost:5145/api/products/search?name=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška prilikom pretrage proizvoda:", err);
        setLoading(false);
      });
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (products.length === 0)
    return <div className="loading-style">Nema proizvoda za "{query}"</div>;

  return (
    <div className="shop-category">
      <h2>Rezultati pretrage za "{query}"</h2>
      <div className="shop-category-products">
        {products.map((item) => (
          <Item
            key={item.id}
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
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
