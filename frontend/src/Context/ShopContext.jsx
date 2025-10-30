import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5145/api/products`)
      .then((res) => res.json())
      .then((data) => setAllProduct(data))
      .catch((err) => console.error("Greska! ", err));
  }, []);

  const contextValue = { all_product };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
