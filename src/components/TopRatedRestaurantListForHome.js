import React, { useState, useEffect } from "react";
import { localurl } from "../utils/localUrl";
import { Link, useNavigate } from "react-router-dom";

function TopRatedRestaurantListForHome() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

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
    <div className="mt-20 mb-48 mx-auto w-2/4">
      <h3 className="mt-2 mb-10 text-xl font-bold">실시간 인기 TOP3</h3>
      <div className="flex">
        {/* 상위 3개만 노출 */}
        {restaurants.slice(0, 3).map((restaurant) => (
          <div
            key={restaurant.id}
            className="mx-10 w-full max-w-sm bg-white  rounded-lg"
          >
            <div className="basis-1/3 flex flex-col items-center">
              <img
                onClick={() => {
                  navigate(`/restaurant/${restaurant.id}`);
                }}
                src={`${localurl}/store/${restaurant.id}/image/${restaurant.imageOneId}`}
                alt={`${restaurant.name}-${restaurant.imageOneId}`}
                className="w-32 h-32 mb-3 rounded-full shadow-lg cursor-pointer"
              />
              <h5 className="mb-1 text-l font-bold text-gray-900 dark:text-white">
                <Link to={`/restaurant/${restaurant.id}`}>
                  [{restaurant.name}]
                </Link>
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {restaurant.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRatedRestaurantListForHome;
