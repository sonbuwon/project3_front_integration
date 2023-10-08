export const formatTime = (time) => {
  // const [hour, minute] = timeString.split(":").map((str) => parseInt(str, 10));
  const [hour, minute] = time;

  if (hour < 12) {
    return `오전 ${hour}:${minute < 10 ? "0" + minute : minute}`;
  } else {
    return `오후 ${hour - 12}:${minute < 10 ? "0" + minute : minute}`;
  }
};
