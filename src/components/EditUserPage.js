import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { localurl } from "../utils/localUrl";

function EditUserPage() {
  const navigate = useNavigate();
  // navigate의 state 속성 값 받아오기
  const location = useLocation();
  const userEditInfo = location.state.userEditInfo;

  const [newNickname, setNewNickname] = useState(userEditInfo.nickname);
  const [newEmail, setNewEmail] = useState(userEditInfo.email);
  const [newPhonenumber, setNewPhonenumber] = useState(
    userEditInfo.phoneNumber
  );

  const editConfirm = () => {
    const token = localStorage.getItem("refreshToken");

    if (!token) {
      return;
    }

    fetch(`${localurl}/user/editInfo`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: newNickname,
        email: newEmail,
        phoneNumber: newPhonenumber,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("정보가 수정되었습니다");
          navigate("/user/mypage");
          window.location.reload();
        } else {
          alert("정보 수정에 실패하셨습니다");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error. Please try again.");
      });
  };

  return (
    <div>
      <h3>회원 정보 수정</h3>
      <div>
        <span>닉네임: </span>
        <input
          defaultValue={userEditInfo.nickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="닉네임"
        />
        <br />
      </div>
      <div>
        <span>이메일: </span>
        <input
          defaultValue={userEditInfo.email}
          onChange={(e) => setNewEmail(e.target.value)}
          type="email"
          placeholder="이메일"
        />
        <br />
      </div>
      <div>
        <span>연락처: </span>
        <input
          defaultValue={userEditInfo.phoneNumber}
          onChange={(e) => setNewPhonenumber(e.target.value)}
          placeholder="연락처"
        />
        <br />
      </div>
      <div>
        <button onClick={editConfirm}>수정하기</button>
      </div>
    </div>
  );
}

export default EditUserPage;
