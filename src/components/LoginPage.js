import React, { useState } from "react";
import { localurl } from "../utils/localUrl";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [idValue, setId] = useState("");
  const [pwValue, setPw] = useState("");

  const saveUserId = (e) => {
    setId(e.target.value);
  };
  const saveUserPw = (e) => {
    setPw(e.target.value);
  };

  const doLogin = () => {
    fetch(`${localurl}/generateToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mid: idValue,
        mpw: pwValue,
      }),
    })
      .then((response) => {
        // 응답 본문을 텍스트로 읽음
        return response.text();
      })
      .then((textData) => {
        // 텍스트 데이터를 JSON으로 변환
        const jsonData = JSON.parse(textData);
        // 로컬 스토리지에 저장
        localStorage.setItem("accessToken", jsonData.accessToken);
        localStorage.setItem("refreshToken", jsonData.refreshToken);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>로그인 페이지</p>
      <div>
        <input
          value={idValue}
          onChange={saveUserId}
          type="text"
          placeholder="ID"
        />
        <br />
        <input
          value={pwValue}
          onChange={saveUserPw}
          type="password"
          placeholder="PASSWORD"
        />
      </div>
      <div>
        <button onClick={doLogin}>로그인</button>
      </div>
    </div>
  );
}

export default LoginPage;
