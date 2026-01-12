import React from "react";
import { useEffect, useState } from "react";

const APIcall = () => {
  const [data, setData] = useState(null);
  console.log("url:", import.meta.env.VITE_API_URI);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URI}/api`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      <p>This is paragraph</p>
      <p>{data}</p>
      <button onClick={() => setData("Hello World")}>Click</button>
    </div>
  );
};

export default APIcall;
