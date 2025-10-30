import React, { useEffect, useState } from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";
import { useParams } from "react-router-dom";

const BreadCrum = () => {
  const [productData, setProductData] = useState("");
  const { productId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5145/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      })
      .catch((err) => console.error("Greska pri ucitavanju proizvoda! ", err));
  }, [productId]);

  if (!productData) return null;
  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt="" />
      {productData.category && (
        <>
          {productData.category.toUpperCase()}
          {""}
          <img src={arrow_icon} alt="" />
        </>
      )}
      {productData.name}
    </div>
  );
};

export default BreadCrum;
