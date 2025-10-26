import React from "react";
import "./Popular.css";
import data_product from "../Assets/data";
import Item from "../Items/Item";

function Popular() {
  return (
    <div className="popular">
      <h1>Popular in women</h1>
      <hr />
      <div className="popular-items">
        {data_product.map((item) => (
          <Item
            image={item.image}
            id={item.id}
            name={item.name}
            new_price={item.new_price+" $"}
            old_price={item.old_price+" $"}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
