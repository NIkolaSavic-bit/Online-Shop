import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrum from "../Components/BreadCrums/BreadCrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  if (!all_product || all_product.length === 0) {
    return <div>Loading...</div>;
  }
  const product = all_product.find((e) => e.id === Number(productId));
  if (!product) {
    console.log("Proizvod nije pronađen za ID:", productId);
    return <div>Proizvod nije pronađen</div>;
  }
  return (
    <div>
      <BreadCrum product={product} />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
