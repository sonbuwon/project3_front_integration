import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { localurl } from "../utils/localUrl";
import { formatTime } from "../utils/formatTime";

import "../styles/RestaurantList.css";

function SearchBar() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  // navigate의 state 속성 값 받아오기
  const location = useLocation();
  const keyword = location.state.keyword;

  useEffect(() => {
    if (keyword === "") return;

    fetch(`${localurl}/store/search/${keyword}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => console.error(err));
  }, [keyword]);

  return (
    <div>
      {restaurants.length >= 1 ? (
        <div>
          <h3 className="my-10 text-4xl flex justify-center font-bold">
            검색된 목록
          </h3>
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
      ) : (
        <div className="w-max mx-auto">검색 결과가 없습니다.</div>
      )}
    </div>
  );
}

export default SearchBar;
