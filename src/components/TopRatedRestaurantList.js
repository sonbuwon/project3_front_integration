import React, { useState, useEffect } from "react";
import { localurl } from "../utils/localUrl";
import { formatTime } from "../utils/formatTime";
import { Link } from "react-router-dom";

function TopRatedRestaurantList() {
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
      <h3>인기 TOP목록</h3>
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
            <th>예약횟수</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>
                <td>
                  <img
                    src={`${localurl}/store/${restaurant.id}/image/${restaurant.imageOneId}`}
                    alt={`${restaurant.name}-${restaurant.imageOneId}`}
                    width={"200"}
                  />
                </td>
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
              <td>{restaurant.reservationCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopRatedRestaurantList;
