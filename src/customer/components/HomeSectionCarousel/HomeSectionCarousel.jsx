import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { birthday_cake } from "../../../data/birthday_cake";

const HomeSectionCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5 },
    };
    const slidePrev = () => setActiveIndex(activeIndex - 1);
    const slideNext = () => setActiveIndex(activeIndex + 1);
    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const items = birthday_cake
        .slice(0, 10)
        .map((item) => <HomeSectionCard product={item} />);
    return (
        <div className="px-4 lg:px-8">
            <div className="relative p-5 bord">
                <AliceCarousel
                    items={items}
                    disableButtonsControls
                    // autoPlay
                    // autoPlayInterval={1000}
                    // infinite
                    disableDotsControls
                    onSlideChanged={syncActiveIndex}
                    activeIndex={activeIndex}
                    responsive={responsive}

                    //Kod sa gita
                    // disableButtonsControls
                    // disableDotsControls
                    // mouseTracking
                    // items={items}
                    // activeIndex={activeIndex}
                    // responsive={responsive}
                    // onSlideChanged={syncActiveIndex}
                    // animationType="fadeout"
                    // animationDuration={2000}
                />
                {activeIndex !== items.length - 5 && (
                    <Button
                        onClick={slideNext}
                        className="z-50"
                        variant="conatained"
                        sx={{
                            position: "absolute",
                            top: "8rem",
                            right: "0rem",
                            transform: "translateX(60%)",
                        }}
                        aria-label="next"
                    >
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    </Button>
                )}
                {activeIndex !== 0 && (
                    <Button
                        className="z-50"
                        variant="conatained"
                        sx={{
                            position: "absolute",
                            top: "8rem",
                            left: "0rem",
                            transform: "translateX(-50%)",
                        }}
                        aria-label="next"
                        onClick={slidePrev}
                    >
                        <ArrowBackIosIcon></ArrowBackIosIcon>
                    </Button>
                )}
            </div>
        </div>
    );
};

export { HomeSectionCarousel };
