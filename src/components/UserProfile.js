import React, { useState, useEffect } from "react";
import { localurl } from "../utils/localUrl";

function UserProfile() {
  const [userNickname, setUserNickname] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");

    // 토큰이 없으면 fetch를 호출하지 않고 종료
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch(`${localurl}/user/getUserNickname`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setIsAuthenticated(false); // 토큰이 유효하지 않으면 인증 상태를 false로 설정
        }
        return response.text();
      })
      .then((data) => {
        setUserNickname(data);
      });
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <p>접속한 유저: {userNickname}</p>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
}

export default UserProfile;
