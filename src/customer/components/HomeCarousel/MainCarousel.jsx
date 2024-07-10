import React from "react";
import { mainCarouselData } from "./MainCarouselData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCarousel = () => {
  const items = mainCarouselData.map((item) => (
    <img
      role="presentation"
      className="cursor-pointer"
      src={item.image}
      style={{ width: "100%", height: "500px" }}
      alt="main carousel"
    />
  ));

  return (
    <div>
      {" "}
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
      />
    </div>
  );
};

export default MainCarousel;
