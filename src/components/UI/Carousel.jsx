import React, { useState } from "react";
import "./carousel.module.css";

export default function Carousel({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);