import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { localurl } from "../utils/localUrl";
import { formatTime } from "../utils/formatTime";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";

import "../styles/RestaurantDetailPage.css";

function RestaurantDetailPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null); // 이 부분은 식당 하나의 상세 정보만을 가져오도록 수정하였습니다.
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${localurl}/store/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data);
      })
      .catch((error) => {
        console.error("Error uploading data: ", error);
      });
  }, [id]);

  const reserveRestaurant = () => {
    const reservationData = {
      restaurantId: id,
    };

    const token = localStorage.getItem("refreshToken");

    fetch(`${localurl}/user/reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("예약이 완료되었습니다.");
          navigate("/user/mypage");
        } else if (response.status === 401) {
          alert("예약은 로그인이 필요합니다.");
          navigate("/user/login");
        } else if (response.status === 409) {
          alert("중복된 예약이 존재합니다.");
          navigate("/user/mypage");
        } else {
          alert("예약에 실패하셨습니다.");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (!restaurant) return <div>Loading....</div>;

  return (
    <div>
      <h3>식당 상세 정보 페이지</h3>
      <div className="detail-container">
        <h4 className="title-text">{restaurant.name}</h4>

        <div>
          <p>소개: {restaurant.description}</p>
          <p>전화번호: {restaurant.callNumber}</p>
        </div>
        <button className="button-1" onClick={reserveRestaurant}>
          예약하기
        </button>

        <p>카테고리: {restaurant.category}</p>
        <p>오픈 시간: {formatTime(restaurant.openingTime)}</p>
        <p>마감 시간: {formatTime(restaurant.closingTime)}</p>
        <div>
          {restaurant.imageIds &&
            restaurant.imageIds.map((restaurantImageId, index) => (
              <img
                key={index}
                src={`${localurl}/store/${id}/image/${restaurantImageId}`}
                alt={`${restaurant.name}-${index}`}
                width={"200"}
              />
            ))}
        </div>

        <KakaoMap location={restaurant.location} />
        <p>위치: {restaurant.location}</p>
      </div>
    </div>
  );
}

export default RestaurantDetailPage;
