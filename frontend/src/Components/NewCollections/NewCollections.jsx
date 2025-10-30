import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Items/Item";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const NewCollections = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5145/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="new-collections">
      <h1>New Collections</h1>
      <hr />
      <div className="collections">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          grabCursor={true}
        >
          {products
            .sort(() => 0.5 - Math.random())
            .slice(0, 10)
            .map((item) => (
              <SwiperSlide key={item.id}>
                <Item
                  key={item.id}
                  image={`http://localhost:5145${item.image}`}
                  id={item.id}
                  name={item.name}
                  new_price={item.newPrice + " $"}
                  old_price={item.oldPrice + " $"}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewCollections;
