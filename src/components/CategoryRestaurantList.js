import React, { useState, useEffect } from "react";
import { localurl } from "../utils/localUrl";
import { Link, useParams } from "react-router-dom"; // useParams 추가
import { formatTime } from "../utils/formatTime";

function CategoryRestaurantList() {
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
      <h3>{category} 목록</h3>
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
  );
}

export default CategoryRestaurantList;
