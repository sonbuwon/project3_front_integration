import React, { useState, useEffect } from "react";
import { localurl } from "../utils/localUrl";
import { formatTime } from "../utils/formatTime";
import { Link, useNavigate } from "react-router-dom";

import "../styles/RestaurantList.css";

function TopRatedRestaurantList() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  // 마운트시 예약 횟수가 많은 순서대로 식당 목록 출력
  useEffect(() => {
    fetch(`${localurl}/store/topWithImageOne`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버에서 이미 정렬된 데이터를 받아옴
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <div>
        <h3 className="my-10 text-4xl flex justify-center font-bold">
          인기 TOP
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
                <li className="reservationCount-text">
                  예약횟수: {restaurant.reservationCount}회
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

export default TopRatedRestaurantList;
