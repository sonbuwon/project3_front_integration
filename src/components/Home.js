import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <li>
          <Link to="/restaurant/byCategory/한식">한식</Link> |{" "}
          <Link to="/restaurant/byCategory/일식">일식</Link> |{" "}
          <Link to="/restaurant/byCategory/중식">중식</Link> |{" "}
          <Link to="/restaurant/byCategory/양식">양식</Link> |{" "}
          <Link to="/restaurant/byCategory/카페">카페</Link>
        </li>
        <li>
          <Link to="/restaurant/byCategory/피자">피자</Link> |{" "}
          <Link to="/restaurant/byCategory/치킨">치킨</Link> |{" "}
          <Link to="/restaurant/byCategory/분식">분식</Link> |{" "}
          <Link to="/restaurant/byCategory/고기">고기</Link> |{" "}
          <Link to="/restaurant/byCategory/호텔">호텔</Link> |{" "}
          <Link to="/restaurant/byCategory/오마카세">오마카세</Link> |{" "}
          <Link to="/restaurant/byCategory/파인다이닝">파인다이닝</Link>
        </li>
      </div>
    </div>
  );
}

export default Home;
