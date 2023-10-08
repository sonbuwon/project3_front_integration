import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localurl } from "../utils/localUrl";
import { formatDay } from "../utils/formatDay";

function MyPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    mid: "",
    nickname: "",
    reservationList: [],
    email: "",
    birth: "",
    phoneNumber: "",
  });
  const [userEditInfo, setUserEditInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");

    if (!token) {
      return;
    }

    fetch(`${localurl}/user/mypage`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("Error uploading data: ", error);
      });
  }, []);

  const handleEdit = (editInfo) => {
    navigate("/user/edituser", {
      state: { userEditInfo: editInfo },
    });
  };

  const editUserInfo = () => {
    const token = localStorage.getItem("refreshToken");

    if (!token) {
      return;
    }

    fetch(`${localurl}/user/editInfo`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserEditInfo(data);
        handleEdit(data);
      })
      .catch((error) => {
        console.error("Error uploading data: ", error);
      });
  };

  const deleteReservation = (reservationId) => {
    const token = localStorage.getItem("refreshToken");

    if (!token) {
      return;
    }

    fetch(`${localurl}/user/deleteReservation/${reservationId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("예약이 삭제되었습니다.");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error deleting reservation: ", error);
      });
  };

  return (
    <div>
      {/* 예약 정보 */}
      <div>
        <h3>{userInfo.nickname}님의 마이페이지</h3>
        <h3>예약 리스트</h3>
        <ul>
          {userInfo.reservationList.length > 0 ? (
            <ul>
              {userInfo.reservationList.map((reservation, index) => (
                <li key={index}>
                  {reservation.restaurant_name}
                  <button
                    onClick={() =>
                      deleteReservation(reservation.reservation_id)
                    }
                  >
                    예약 삭제
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>예약 내역이 없습니다</p>
          )}
        </ul>
      </div>
      {/* 회원 정보 */}
      <div>
        <h3>회원 정보</h3>
        <p>
          <span>이메일: </span>
          {userInfo.email}
        </p>
        <p>
          <span>연락처: </span>
          {userInfo.phoneNumber}
        </p>
        <p>
          <span>생년월일: </span>
          {formatDay(userInfo.birth)}
        </p>
        <p>
          <button onClick={editUserInfo}>회원 정보 수정</button>
        </p>
      </div>
    </div>
  );
}

export default MyPage;
