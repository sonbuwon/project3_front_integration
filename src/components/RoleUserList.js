import React, { useEffect, useState } from "react";
import { localurl } from "../utils/localUrl";
import { formatDay } from "../utils/formatDay";

function RoleUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      return;
    }

    fetch(`${localurl}/admin/user/list`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const deleteUser = (id) => {
    const token = localStorage.getItem("refreshToken");

    fetch(`${localurl}/admin/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          // 성공적으로 삭제된 경우, 리스트에서 해당 항목을 제거
          setUsers(users.filter((user) => user.mid !== id));
        } else {
          console.error("Error deleting user");
        }
      })
      .catch((error) => {
        console.error("Error deleting usert: ", error);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 relative overflow-x-auto">
        <h3 className="my-4 text-2xl">유저 목록(관리자용)</h3>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                아이디
              </th>
              <th scope="col" className="px-6 py-3">
                닉네임
              </th>
              <th scope="col" className="px-6 py-3">
                이메일
              </th>
              <th scope="col" className="px-6 py-3">
                생년월일
              </th>
              <th scope="col" className="px-6 py-3">
                연락처
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.mid}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.mid}
                </th>
                <td className="px-6 py-4">{user.nickname}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{formatDay(user.birth)}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteUser(user.mid)}
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

export default RoleUserList;
