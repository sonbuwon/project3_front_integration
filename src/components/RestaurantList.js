import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { localurl } from "../utils/localUrl";
import { formatTime } from "../utils/formatTime";
import { useNavigate } from "react-router-dom";

import "../styles/RestaurantList.css";

function RestaurantList() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(`${localurl}/store/listAllWithImageOne`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error uploading data: ", error);
      });
  }, []);

  return (
    <div>
      <div>
        <h3 className="my-10 text-4xl flex justify-center font-bold">
          맛집 목록
        </h3>
        <div className="list-container">
          {restaurants.map((restaurant) => (
            <ul
              key={restaurant.id}
              className="item shadow-md transition ease-in-out delay-130 hover:-translate-y-1 hover:scale-105 duration-300"
            >
              <li>
                <img
                  // 이미지 클릭시에도 식당 상세페이지로 이동
                  onClick={() => {
                    navigate(`/restaurant/${restaurant.id}`);
                  }}
                  className="food-img cursor-pointer"
                  src={`${localurl}/store/${restaurant.id}/image/${restaurant.imageOneId}`}
                  alt={`${restaurant.name}-${restaurant.imageOneId}`}
                />
              </li>
              <ul className="restaurant-text">
                <li>
                  <Link
                    className="restaurant-name"
                    to={`/restaurant/${restaurant.id}`}
                  >
                    {restaurant.name}
                  </Link>
                </li>
                <li className="description-text">{restaurant.description}</li>
                <ul className="format-time">
                  <li>영업시간: {formatTime(restaurant.openingTime)}~</li>
                  <li>{formatTime(restaurant.closingTime)}</li>
                </ul>
                <li className="callNumber-text">
                  전화번호: {restaurant.callNumber}
                </li>
                <li className="category-text">{restaurant.category}</li>
              </ul>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantList;
