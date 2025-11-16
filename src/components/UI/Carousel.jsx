import React, { useState } from "react";
import "./carousel.module.css";

export default function Carousel({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % shows.length);
    };

    const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + shows.length) % shows.length);
   };
}