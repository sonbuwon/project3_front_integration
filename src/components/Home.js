import React from "react";
import { Link } from "react-router-dom";
import TopRatedRestaurantListForHome from "./TopRatedRestaurantListForHome";
import MainBanner from "./MainBanner";

function Home() {
  return (
    <div>
      <div>
        {/* 홈 배너 이미지 */}
        <MainBanner />
        {/* 실시간 인기 TOP3 */}
        <TopRatedRestaurantListForHome />
        {/* 카테고리 칸 */}
        <div className="mt-20 mb-32 mx-auto w-2/4 ">
          <h3 className="mt-2 mb-10 text-xl font-bold">카테고리별</h3>
          <div className="grid grid-cols-4 gap-4 justify-items-center">
            {/* 한식 */}
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/한식">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/korean.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">한식</p>
            </div>
            {/* 일식 */}
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/일식">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/japanese.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">일식</p>
            </div>
            {/* 중식 */}
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/중식">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/chinese.png"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">중식</p>
            </div>
            {/* 양식 */}
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/양식">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/western.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">양식</p>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/카페">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/cafe.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">카페</p>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/피자">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/pizza.png"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">피자</p>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/치킨">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/chicken.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">치킨</p>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/분식">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/ttuck.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">분식</p>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/고기">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/meat.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">고기</p>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/호텔">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/hotel.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">호텔</p>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/오마카세">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/oma.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">오마카세</p>
            </div>
            <div className="flex flex-col items-center">
              <Link to="/restaurant/byCategory/파인다이닝">
                <img
                  className="w-32 h-32 flex justify-center items-center border rounded-full hover:shadow-md shadow-gray-950"
                  src="/img/categories/pine.jpg"
                  alt="category_korean"
                ></img>
              </Link>
              <p className="mt-2 font-bold">파인다이닝</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
