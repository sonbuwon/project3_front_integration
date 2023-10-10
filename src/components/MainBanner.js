import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import "../styles/Main.css";

function MainBanner() {
  return (
    <div className="banner">
      <Carousel autoplay autoplaySpeed={3000}>
        <div>
          <Link to="/">
            <img src="/img/banners/banner1.png" alt="Slide 1" />
          </Link>
        </div>
        <div className="banner">
          <Link to="/">
            <img src="/img/banners/banner2.png" alt="Slide 2" />
          </Link>
        </div>
        <div className="banner">
          <Link to="/">
            <img src="/img/banners/banner3.png" alt="Slide 3" />
          </Link>
        </div>
        <div className="banner">
          <Link to="/">
            <img src="/img/banners/banner4.png" alt="Slide 4" />
          </Link>
        </div>
      </Carousel>
    </div>
  );
}

export default MainBanner;
