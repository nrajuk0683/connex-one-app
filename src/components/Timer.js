import React, { useState, useEffect } from "react";
const Timer = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  var clientTime = new Date();
  var isFirstLoad = true;
  function getTimerData() {
    fetch("http://localhost:4000/time")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          if (isFirstLoad) {
            clientTime = new Date();
            isFirstLoad = false;
          }
          const serverTime = new Date(data.epoch);
          const totalSeconds = Math.ceil(
            (serverTime.getTime() - clientTime.getTime()) / 1000
          );

          var sec_num = parseInt(totalSeconds, 10); // don't forget the second param
          var hours = Math.floor(sec_num / 3600);
          var minutes = Math.floor((sec_num - hours * 3600) / 60);
          var seconds = sec_num - hours * 3600 - minutes * 60;

          if (hours < 10) {
            hours = "0" + hours;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }

          setTimer(hours + ":" + minutes + ":" + seconds);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  useEffect(() => {
    getTimerData();
    const id = setInterval(() => {
      getTimerData();
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (error) {
    return <div className="timer-container">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <div className="timer-container">Timer : {timer}</div>;
  }
};
export default Timer;
