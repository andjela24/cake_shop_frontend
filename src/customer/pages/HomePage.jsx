import React from "react";
import HomeCarousel from "../components/carousel/HomeCarousel";
import { homeCarouselData } from "../components/carousel/HomeCarouselData";
import HomeProductSection from "../components/home/HomeProductSection";
import { latest_cake } from "../../data/latest_cake";
import { birthday_cake } from "../../data/birthday_cake";
import { wedding_cake } from "../../data/wedding_cake";
import { formal_cake } from "../../data/formal_cake";
import { special_cake } from "../../data/special_cake";

const Homepage = () => {
  return (
    <div className="">
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
        <HomeProductSection data={latest_cake} section={"Najnovije"} />
        <HomeProductSection data={birthday_cake} section={"Dečije Torte"} />
        <HomeProductSection data={wedding_cake} section={"Svadbene Torte"} />
        <HomeProductSection data={formal_cake} section={"Svečane Torte"} />
        <HomeProductSection data={special_cake} section={"Specijal"} />
      </div>
    </div>
  );
};

export default Homepage;
