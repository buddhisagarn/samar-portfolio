import React from "react";
import { FaHome } from "react-icons/fa";

const HomeButton = () => {
  return (
    <button className="  bg-blue flex items-center gap-2 text-white p-2 rounded-sm ps-4 pr-4 cursor-pointer border border-white">
      <FaHome /> Back Home
    </button>
  );
};

export default HomeButton;
