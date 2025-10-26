import React from "react";
import "./NewCollections.css";
import new_collections from "../Assets/new_collections";
import Item from "../Items/Item";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const NewCollections = () => {
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
          {new_collections.map((item, index) => (
            <SwiperSlide key={index}>
              <Item
                image={item.image}
                id={item.id}
                
                name={item.name}
                new_price={item.new_price + " $"}
                old_price={item.old_price + " $"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewCollections;
