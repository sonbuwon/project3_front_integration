import React from "react";
import { Link } from "react-router-dom";
import TopRatedRestaurantListForHome from "./TopRatedRestaurantListForHome";

function Home() {
  return (
    <div>
      <div>
        {/* 홈 메인 이미지 */}
        <div className="my-2 py-2 bg-gray-200 ">메인 이미지</div>
        {/* 카테고리 칸 */}
        <div className="mx-auto w-2/4 grid grid-cols-4 gap-4">
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/한식">한식</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/일식">일식</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/중식">중식</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/양식">양식</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/카페">카페</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/피자">피자</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/치킨">치킨</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/분식">분식</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/고기">고기</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/호텔">호텔</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/오마카세">오마카세</Link>
          </p>
          <p className="p-4 flex justify-center border hover:border-orange-500">
            <Link to="/restaurant/byCategory/파인다이닝">파인다이닝</Link>
          </p>
        </div>
        {/* 실시간 인기 */}
        <TopRatedRestaurantListForHome />
      </div>
    </div>
  );
}

export default Home;
