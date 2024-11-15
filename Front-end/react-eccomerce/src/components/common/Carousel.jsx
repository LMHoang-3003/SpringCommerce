import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export default function CarouselWithIndicators() {
  return (
    <TECarousel showControls showIndicators ride="carousel">
      <TECarouselItem itemID={1}>
        <img
          src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
          className="block w-full"
          alt="Slide 1"
        />
      </TECarouselItem>
      <TECarouselItem itemID={2}>
        <img
          src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
          className="block w-full"
          alt="Slide 2"
        />
      </TECarouselItem>
      <TECarouselItem itemID={3}>
        <img
          src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
          className="block w-full"
          alt="Slide 3"
        />
      </TECarouselItem>
    </TECarousel>
  );
}
