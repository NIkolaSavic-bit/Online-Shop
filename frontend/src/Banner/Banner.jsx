import React, { useEffect, useState } from "react";
import "./Banner.css";
import { useBannerTimer } from "../hooks/useBannerTime";
import { AuthContext } from "../Context/AuthContext";

const Banner = ({ category }) => {
  const timeLeft = useBannerTimer(AuthContext);
  const [fade, setFade] = useState(false);
  const [categoryData, setCategoryData] = useState({ title: "", image: "" });

  useEffect(() => {
    setFade(true);
    const t = setTimeout(() => setFade(false), 300);
    return () => clearTimeout(t);
  }, [category]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5145/api/products/category/${category}`
        );
        const products = await res.json();

        if (products.length > 0) {
          setCategoryData({
            title: category.charAt(0).toUpperCase() + category.slice(1), // npr. "Muškarci"
            image: products[0].images?.[0]
              ? `http://localhost:5145${products[0].images[0]}`
              : "",
          });
        } else {
          setCategoryData({ title: category, image: "" });
        }
      } catch (err) {
        console.error("Greška pri učitavanju kategorije:", err);
      }
    };

    if (category) fetchCategoryData();
  }, [category]);

  const formtaTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`banner ${fade ? "fade" : ""}`}>
      <div className="banner_content">
        <h1>{categoryData.title || "Loading..."}</h1>
        <p>Specijalna ponuda zavrsava za: </p>
        <div className="timer">{formtaTime(timeLeft)}</div>
      </div>
      <div className="banner_image">
          {categoryData.image && (
          <img src={categoryData.image} alt={categoryData.title} />
        )}
      </div>
    </div>
  );
};

export default Banner;
