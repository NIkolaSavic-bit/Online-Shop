import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Items/Item";

function Popular() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // poziv API-ja
    fetch("http://localhost:5145/api/products/category/women")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="popular">
      <h1>Popular in women</h1>
      <hr />
      <div className="popular-items">
        {products.slice(0,4).map((item) => (
          <Item
            key={item.id}
            image={`http://localhost:5145${item.image}`}
            id={item.id}
            name={item.name}
            new_price={item.newPrice + " $"}
            old_price={item.oldPrice + " $"}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
