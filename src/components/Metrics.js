import React, { useState, useEffect } from "react";
const Metrics = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [metrics, setMetrics] = useState("");
  function getTimerData() {
    fetch("http://localhost:4000/metrics")
      .then((res) => res.text())
      .then(
        (data) => {
          setIsLoaded(true);
          setMetrics(data);
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
    }, 30000);
    return () => clearInterval(id);
  }, []);

  if (error) {
    return <div className="metrics-container">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <div className="metrics-container">Service Time :{metrics} </div>;
  }
};
export default Metrics;
