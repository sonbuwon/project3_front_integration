import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { localurl } from "../utils/localUrl";
import { formatTime } from "../utils/formatTime";

function SearchBar() {
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
          <h3>검색 목록</h3>
          <table>
            <thead>
              <tr>
                <th>대표 이미지</th>
                <th>식당명</th>
                <th>위치</th>
                <th>카테고리</th>
                <th>소개</th>
                <th>오픈 시간</th>
                <th>마감 시간</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td>
                    <img
                      src={`${localurl}/store/${restaurant.id}/image/${restaurant.imageOneId}`}
                      alt={`${restaurant.name}-${restaurant.imageOneId}`}
                      width={"200"}
                    />
                  </td>
                  <td>
                    <Link to={`/restaurant/${restaurant.id}`}>
                      {restaurant.name}
                    </Link>
                  </td>
                  <td>{restaurant.location}</td>
                  <td>{restaurant.category}</td>
                  <td>{restaurant.description}</td>
                  <td>{formatTime(restaurant.openingTime)}</td>
                  <td>{formatTime(restaurant.closingTime)}</td>
                  <td>{restaurant.callNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
}

export default SearchBar;
