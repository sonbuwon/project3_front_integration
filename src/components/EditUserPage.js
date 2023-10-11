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
    <div className="flex flex-col items-center w-1/2 mx-auto mt-20">
      <div>
        <h3 className="text-3xl font-bold">회원 정보 수정</h3>
      </div>
      {/* 수정 구역 */}
      <div className="my-10">
        <div className="w-80 my-2">
          <span className="w-1/5 text-gray-400">닉네임: </span>
          <input
            defaultValue={userEditInfo.nickname}
            onChange={(e) => setNewNickname(e.target.value)}
            type="text"
            placeholder="닉네임"
            className="w-4/5 rounded-lg border-gray-300"
          />
          <br />
        </div>
        <div className="w-80 my-2">
          <span className="w-1/5 text-gray-400">이메일: </span>
          <input
            defaultValue={userEditInfo.email}
            onChange={(e) => setNewEmail(e.target.value)}
            type="email"
            placeholder="이메일"
            className="w-4/5 rounded-lg border-gray-300"
          />
          <br />
        </div>
        <div className="w-80 my-2">
          <span className="w-1/5 text-gray-400">연락처: </span>
          <input
            defaultValue={userEditInfo.phoneNumber}
            onChange={(e) => setNewPhonenumber(e.target.value)}
            type="text"
            placeholder="연락처"
            className="w-4/5 rounded-lg border-gray-300"
          />
          <br />
        </div>
      </div>
      {/* 수정하기 버튼 */}
      <div>
        <button
          onClick={editConfirm}
          className="w-80 focus:outline-none text-white bg-amber-950 hover:bg-amber-400 focus:ring-4 focus:ring-purple-300 font-medium text-sm px-5 py-2.5 mb-2"
        >
          수정하기
        </button>
      </div>
    </div>
  );
}

export default EditUserPage;
