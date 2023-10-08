import React, { useCallback, useState } from "react";
import { localurl } from "../utils/localUrl";

function SamplePage() {
  const [result, setResult] = useState(null);

  const callServer = useCallback(async () => {
    console.log("call server 1...");

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw "Cannot Find Access Token";
    }

    const authHeader = { Authorization: `Bearer ${accessToken}` };

    try {
      const response = await fetch(`${localurl}/api/sample/doA`, {
        method: "GET",
        headers: authHeader,
      });

      if (!response.ok) {
        const data = await response.json();

        if (data.msg === "Expired Token") {
          console.log("Refresh Your Token");

          await callRefresh();
          console.log("new tokens....saved..");
          return callServer();
        }

        throw data.msg;
      }

      return await response.json();
    } catch (err) {
      throw err;
    }
  }, []);

  const callRefresh = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const tokens = { accessToken, refreshToken };
    const response = await fetch(`${localurl}/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokens),
    });

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }, []);

  const handleButtonClick = useCallback(() => {
    callServer()
      .then((result) => {
        setResult(result);
      })
      .catch((error) => {
        alert(error);
      });
  }, [callServer]);

  return (
    <div>
      <h3>로그인시만 접근 가능</h3>

      <button onClick={handleButtonClick} className="btn1">
        CALL SERVER
      </button>

      <p className="result">{result && JSON.stringify(result)}</p>
    </div>
  );
}

export default SamplePage;
