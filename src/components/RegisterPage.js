import React, { useState } from "react";
import { localurl } from "../utils/localUrl";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBirthChange = (e) => {
    setBirth(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleRegister = () => {
    fetch(`${localurl}/user/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mid: username,
        mpw: password,
        nickname: nickname,
        email: email,
        birth: birth,
        phoneNumber: phoneNumber,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("회원가입 되었습니다. 환영합니다.");
          // 홈으로 이동
          navigate("/");
        } else {
          alert("회원가입에 실패하셨습니다. 다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error. Please try again.");
      });
  };

  return (
    <div>
      <p>회원가입 페이지</p>
      <div>
        <input
          value={username}
          onChange={handleUsernameChange}
          placeholder="아이디"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          required
        />
        <br />
        <input
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임"
          required
        />
        <br />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일"
        />
        <br />
        <input
          type="date"
          value={birth}
          onChange={handleBirthChange}
          placeholder="생일"
        />
        <br />
        <input
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="연락처"
        />
        <br />
      </div>
      <div>
        <button onClick={handleRegister}>회원가입</button>
      </div>
    </div>
  );
}

export default RegisterPage;
