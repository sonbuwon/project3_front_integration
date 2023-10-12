import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

function Navbar({ userRole }) {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const doTempLogout = () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("로그아웃 되셨습니다.");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  // react-router v6에서 데이터 전달 하는 방법
  const handleSearch = () => {
    navigate("/restaurant/search", {
      state: { keyword: keyword },
    });
    setKeyword("");
  };

  return (
    <div className="header mb-2">
      <div className="header-area flex justify-around items-center px-20">
        {/* 로고 */}
        <div>
          <Link to={"/"}>
            <img src="/img/icons/fooiting.png" alt="logo_image" />
          </Link>
        </div>

        {/* 메뉴1 */}
        <div className="dropdown-Menu flex">
          <ul className="flex">
            <li className="mr-10">
              <Link to="/restaurant/top" className="hover:text-amber-500">
                인기 TOP
              </Link>
            </li>
            <li className="mr-10">
              <Link to="/restaurant/list" className="hover:text-amber-500">
                맛집 목록
              </Link>
            </li>
          </ul>
        </div>

        {/* 검색창 */}
        <div className="w-1/4 flex relative">
          <input
            type="text"
            value={keyword}
            placeholder="검색어를 입력하세요"
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full px-4 py-2 border-none rounded-full bg-gray-200"
          />
          <div
            onClick={handleSearch}
            class="absolute inset-y-0 right-4 flex items-center pl-3 cursor-pointer"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          {/* <button onClick={handleSearch} className="w-1/4">
            검색
          </button> */}
        </div>

        {/* 메뉴2 */}
        <div className="dropdown-Menu flex">
          {/* 접속 유저 닉네임 */}
          <div className="mr-10">
            <UserProfile />
          </div>
          <ul className="flex">
            {userRole === null && (
              <li className="mr-10">
                <Link to="/user/signup" className="hover:text-amber-500">
                  회원가입
                </Link>
              </li>
            )}
            {userRole === null && (
              <li className="mr-10">
                <Link to="/user/login" className="hover:text-amber-500">
                  로그인
                </Link>
              </li>
            )}
            {userRole === "ROLE_USER" && (
              <li className="mr-10">
                <Link to="/user/mypage" className="hover:text-amber-500">
                  마이페이지
                </Link>
              </li>
            )}
            {userRole === "ROLE_ADMIN" && (
              <li className="mr-10">
                <Link
                  to="/admin/registerRestaurant"
                  className="hover:text-amber-500"
                >
                  업체 등록
                </Link>
              </li>
            )}
            {userRole === "ROLE_ADMIN" && (
              <li className="mr-10">
                <Link
                  to="/admin/restaurantList"
                  className="hover:text-amber-500"
                >
                  식당 목록(관리자용)
                </Link>
              </li>
            )}
            {userRole === "ROLE_ADMIN" && (
              <li className="mr-10">
                <Link to="/admin/userList" className="hover:text-amber-500">
                  유저 목록(관리자용)
                </Link>
              </li>
            )}
            {userRole !== null && (
              <li className="mr-10">
                <button onClick={doTempLogout} className="hover:text-amber-500">
                  로그아웃
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
