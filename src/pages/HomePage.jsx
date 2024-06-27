import React from "react";
import HomeCarousel from "../customer/components/carousel/HomeCarousel";
import { homeCarouselData } from "../customer/components/carousel/HomeCarouselData";
import HomeProductSection from "../customer/components/home/HomeProductSection";
import { sareePage1 } from "../data/saree/page1";
import { dressPage1 } from "../data/dress/page1";
import { gounsPage1 } from "../data/gouns/gouns";
import { kurtaPage1 } from "../data/kurta/kurta";
import { mensShoesPage1 } from "../data/shoes";
import { mens_kurta } from "../data/men/menKurta";
import { torte } from "../data/torte/torte";
import { lengha_page1 } from "../data/women/LenghaCholi";
import { latest_cake } from "../data/latest_cake";
import { birthday_cake } from "../data/birthday_cake";
import { wedding_cake } from "../data/wedding_cake";
import { formal_cake } from "../data/formal_cake";
import { special_cake } from "../data/special_cake";

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
