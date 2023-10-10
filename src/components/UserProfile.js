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
        <p className="font-bold">안녕하세요! {userNickname} 님</p>
      ) : (
        <p className="font-bold">로그인이 필요합니다</p>
      )}
    </div>
  );
}

export default UserProfile;
