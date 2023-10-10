import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { localurl } from "../utils/localUrl";
import { formatDay } from "../utils/formatDay";
import "../styles/MyPage.css";

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
    <div className="wrap">
      <div className="greenContainer">
        <div className="name">{userInfo.nickname}님의 마이페이지</div>
      </div>

      <div className="summaryContainer">
        <div className="item">
          <div className="number">
            <h3>예약 리스트</h3>
          </div>
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
              <div className="text">예약 내역이 없습니다.</div>
            )}
          </ul>
        </div>
      </div>

      {/* 회원 정보 */}
      <div className="listContainer">
        <div className="number">
          <h3>회원 정보</h3>
        </div>
        <div className="item">
          <div className="text">이메일 : {userInfo.email}</div>
          <div className="right"></div>
        </div>
        <div className="item">
          <div className="text">연락처 : {userInfo.phoneNumber}</div>
          <div className="right"></div>
        </div>
        <div className="item">
          <div className="text">생년월일 : {formatDay(userInfo.birth)}</div>
          <div className="right"></div>
        </div>
        <div className="item">
          <div className="text">이메일 : {userInfo.email}</div>
          <div className="right"></div>
        </div>
        <div className="button-container">
          <button className="listbutton" onClick={editUserInfo}>
            회원 정보 수정
          </button>
        </div>
      </div>

      <div className="infoContainer">
        <Link to="/" className="item">
          <div>공지사항</div>
        </Link>
        <Link to="/" className="item">
          <div>이용안내</div>
        </Link>
        <Link to="/" className="item">
          <div>고객센터</div>
        </Link>
      </div>
    </div>
  );
}
export default MyPage;
