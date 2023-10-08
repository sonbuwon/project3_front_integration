import React, { useState } from "react";
import { localurl } from "../utils/localUrl";
import { useNavigate } from "react-router-dom";
import Post from "../utils/Post";

import "../styles/RestaurantForm.css";

function RestaurantForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    category: "",
    description: "",
    openingTime: "09:00",
    closingTime: "20:00",
    image: "",
    callNumber: "",
  });

  const [fileInputs, setFileInputs] = useState([0]); // 초기 상태에 하나의 파일 입력 필드
  const [files, setFiles] = useState({});
  // 여기부터 주소창
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });
  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      [e.target.name]: e.target.value,
    });

    setFormData((prev) => ({
      ...prev,
      address: e.target.value,
    }));
  };

  const handleComplete = (data) => {
    setPopup(!popup);
    setFormData((prev) => ({
      ...prev,
      address: enroll_company.address,
    }));
  };
  // 여기까지 주소창

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, index) => {
    const updatedFiles = { ...files };
    updatedFiles[index] = e.target.files[0];
    setFiles(updatedFiles);
  };

  const addFileInput = () => {
    setFileInputs((prev) => [...prev, prev.length]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("refreshToken");

    if (!token) {
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    Object.keys(files).forEach((key) => {
      data.append("image", files[key]);
    });

    const timeout = (ms, promise) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out"));
        }, ms);
        promise.then(resolve, reject);
      });
    };

    timeout(
      6000,
      fetch(`${localurl}/admin/upload`, {
        headers: {
          Authorization: token,
        },
        method: "POST",
        body: data,
      })
    )
      .then((response) => {
        if (response.ok) {
          alert("식당이 등록되었습니다.");
          navigate("/admin/restaurantList");
          console.log(formData.address);
        } else {
          alert("식당 등록에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.error("Error uploading data: ", error);
      });
  };

  return (
    <div>
      <h3 className="titleName">업체 등록</h3>
      <div className="registration-contener">
        <form onSubmit={handleSubmit}>
          <input
            className="input-box"
            name="name"
            type="text"
            placeholder="상호명"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <div>
            <input
              className="input-box"
              placeholder="주소"
              type="text"
              required={true}
              name="location"
              onChange={handleInput}
              value={enroll_company.address}
            />
            <button className="submit-button" onClick={handleComplete}>
              우편번호 찾기
            </button>
          </div>

          {popup && (
            <Post
              company={enroll_company}
              setcompany={(company) => {
                setEnroll_company(company);
                setFormData((prev) => ({
                  ...prev,
                  address: company.address,
                }));
              }}
            ></Post>
          )}
          <br />
          <select
            className="select-box"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- 카테고리 선택 --</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="카페">카페</option>
            <option value="피자">피자</option>
            <option value="치킨">치킨</option>
            <option value="분식">분식</option>
            <option value="고기">고기</option>
            <option value="호텔">호텔</option>
            <option value="오마카세">오마카세</option>
            <option value="파인다이닝">파인다이닝</option>
          </select>
          <br />
          <textarea
            className="textarea-box"
            name="description"
            placeholder="설명"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <br />
          <div className="input-timers">
            오픈시간
            <input
              className="input-timer"
              name="openingTime"
              type="time"
              placeholder="Opening Time"
              value={formData.openingTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-timers">
            마감시간
            <input
              className="input-timer"
              name="closingTime"
              type="time"
              placeholder="Closing Time"
              value={formData.closingTime}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          {/* 이미지 업로드 */}
          <div className="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              이미지 업로드
            </label>
            {fileInputs.map((index) => (
              <div key={index} className="mb-1">
                <input
                  type="file"
                  name={"image" + index}
                  onChange={(e) => handleFileChange(e, index)}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addFileInput}
              className="w-full mt-1 p-2 rounded text-white bg-gray-800 hover:bg-gray-700"
            >
              이미지 추가
            </button>
          </div>
          <input
            className="input-box"
            type="text"
            name="callNumber"
            placeholder="전화번호"
            value={formData.callNumber}
            onChange={handleChange}
            required
          />
          <br />
          <div className="mt-5">
            <button className="submit-button" type="submit">
              업체 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestaurantForm;
