import React, { useState, useEffect } from "react";
import { localurl } from "../utils/localUrl";
import { Link, useParams, useNavigate } from "react-router-dom"; // useParams 추가
import { formatTime } from "../utils/formatTime";

import "../styles/RestaurantList.css";

function CategoryRestaurantList() {
  const navigate = useNavigate();
  const { category } = useParams(); // useParams를 통해 카테고리 값을 가져옴
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // 카테고리별 식당을 불러오는 API 호출
    fetch(`${localurl}/store/byCategoryWithImageOne/${category}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [category]);

  if (restaurants.length === 0) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div>
      <div>
        <h3 className="mb-10 text-4xl flex justify-center">{category} 목록</h3>
        <div className="list-container">
          {restaurants.map((restaurant) => (
            <ul className="item shadow-md" key={restaurant.id}>
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

export default CategoryRestaurantList;
