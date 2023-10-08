import React, { useEffect } from "react";
import { localurl } from "../utils/localUrl";

function TokenPage() {
  const oldAccessToken = localStorage.getItem("accessToken");
  const oldRefreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {}, [oldAccessToken, oldRefreshToken]);

  const doRefresh = () => {
    fetch(`${localurl}/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: oldAccessToken,
        refreshToken: oldRefreshToken,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((textData) => {
        console.log(textData);
        const jsonData = JSON.parse(textData);
        console.log("Parsed JSON data:", jsonData);

        const newAccessToken = jsonData.accessToken;
        const newRefreshToken = jsonData.refreshToken;

        document.querySelector(".accessResult").innerHTML =
          oldAccessToken !== newAccessToken ? newAccessToken : "OLD";
        document.querySelector(".refreshResult").innerHTML =
          oldRefreshToken !== newRefreshToken ? newRefreshToken : "OLD";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>ACCESS TOKEN</h1>
      <p>{oldAccessToken}</p>
      <p className="accessResult"></p>

      <h1>REFRESH TOKEN</h1>
      <p>{oldRefreshToken}</p>
      <p className="refreshResult"></p>
      <button onClick={doRefresh}>REFRESH</button>
    </div>
  );
}

export default TokenPage;
