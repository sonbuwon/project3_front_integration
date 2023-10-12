import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { localurl } from "../utils/localUrl";
import { formatTime } from "../utils/formatTime";

function AdminRestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  // 마운트시 전체 등록된 식당 전체 출력
  useEffect(() => {
    fetch(`${localurl}/store/list`, {
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

  // 삭제 버튼 클릭시 해당 식당 삭제
  const deleteRestaurant = (id) => {
    const token = localStorage.getItem("refreshToken");

    fetch(`${localurl}/admin/store/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          // 성공적으로 삭제된 경우, 리스트에서 해당 항목을 제거
          setRestaurants(
            restaurants.filter((restaurant) => restaurant.id !== id)
          );
        } else {
          console.error("Error deleting restaurant");
        }
      })
      .catch((error) => {
        console.error("Error deleting restaurant: ", error);
      });
  };

  return (
    <div className="mb-20 flex justify-center">
      <div className="w-1/2 relative overflow-x-auto">
        <h3 className="my-4 text-2xl">식당 목록(관리자용)</h3>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                식당명
              </th>
              <th scope="col" className="px-6 py-3">
                위치
              </th>
              <th scope="col" className="px-6 py-3">
                카테고리
              </th>
              <th scope="col" className="px-6 py-3">
                오픈 시간
              </th>
              <th scope="col" className="px-6 py-3">
                마감 시간
              </th>
              <th scope="col" className="px-6 py-3">
                전화번호
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr
                key={restaurant.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/restaurant/${restaurant.id}`}>
                    {restaurant.name}
                  </Link>
                </th>
                <td className="px-6 py-4">{restaurant.location}</td>
                <td className="px-6 py-4">{restaurant.category}</td>
                <td className="px-6 py-4">
                  {formatTime(restaurant.openingTime)}
                </td>
                <td className="px-6 py-4">
                  {formatTime(restaurant.closingTime)}
                </td>
                <td className="px-6 py-4">{restaurant.callNumber}</td>
                <td>
                  <button
                    onClick={() => deleteRestaurant(restaurant.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminRestaurantList;
