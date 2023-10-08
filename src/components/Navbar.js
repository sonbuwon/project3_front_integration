import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="header">
      <div className="header-area">
        <div>
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <button onClick={handleSearch}>검색</button>
        </div>
        <div className="dropdown-Menu">
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/restaurant/top">인기 TOP</Link>
            </li>
            <li>
              <Link to="/restaurant/list">식당 목록</Link>
            </li>
            {userRole === null && (
              <li>
                <Link to="/user/signup">회원가입</Link>
              </li>
            )}
            {userRole === null && (
              <li>
                <Link to="/user/login">로그인</Link>
              </li>
            )}
            {userRole === "ROLE_USER" && (
              <li>
                <Link to="/user/mypage">마이페이지</Link>
              </li>
            )}
            {userRole === "ROLE_ADMIN" && (
              <li>
                <Link to="/admin/registerRestaurant">업체 등록</Link>
              </li>
            )}
            {userRole === "ROLE_ADMIN" && (
              <li>
                <Link to="/admin/restaurantList">식당 목록(관리자용)</Link>
              </li>
            )}
            {userRole === "ROLE_ADMIN" && (
              <li>
                <Link to="/admin/userList">유저 목록(관리자용)</Link>
              </li>
            )}
            {userRole !== null && (
              <li>
                <button onClick={doTempLogout}>로그아웃</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
