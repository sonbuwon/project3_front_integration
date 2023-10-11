import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { localurl } from "../utils/localUrl";
import { formatTime } from "../utils/formatTime";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";

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
      <div className="flex flex-col items-center">
        <div className="w-1/2 flex flex-col items-center">
          {/* 식당명 */}
          <h4 className="mt-10 text-2xl font-bold">{restaurant.name}</h4>
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          {/* 식당 설명 및 연락처 */}
          <div className="w-full flex justify-around">
            <p className="w-1/4 text-slate-700">{restaurant.description}</p>
            <p className="w-1/4 flex justify-center items-center">
              <IoIosCall className="mr-2" size="24" />
              <span className="text-xl">{restaurant.callNumber}</span>
            </p>
          </div>
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <button
            onClick={reserveRestaurant}
            className="w-80 focus:outline-none text-white bg-amber-950 hover:bg-amber-400 focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 mb-2"
          >
            예약하기
          </button>

          <div className="w-full my-10 flex flex-col items-center justify-center">
            <p className="text-slate-700">
              오픈 시간: {formatTime(restaurant.openingTime)}
            </p>
            <p className="text-slate-700">
              마감 시간: {formatTime(restaurant.closingTime)}
            </p>
          </div>

          <div className="flex flex-wrap justify-between">
            {restaurant.imageIds &&
              restaurant.imageIds.map((restaurantImageId, index) => (
                <div
                  className={
                    restaurant.imageIds.length === 1
                      ? "w-full p-2"
                      : "w-1/2 p-2"
                  }
                >
                  <img
                    className="rounded-lg w-full h-80 object-cover transition ease-in-out delay-130 hover:-translate-y-1 hover:scale-105 duration-300"
                    key={index}
                    src={`${localurl}/store/${id}/image/${restaurantImageId}`}
                    alt={`${restaurant.name}-${index}`}
                  ></img>
                </div>
              ))}
          </div>

          <div className="mt-5">
            <KakaoMap location={restaurant.location} />
            <p className="flex justify-center items-center my-1">
              <HiLocationMarker /> <span>{restaurant.location}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailPage;
