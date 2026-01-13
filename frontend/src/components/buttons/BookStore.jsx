import React from "react";
import { IoCartSharp } from "react-icons/io5";

const BookStore = () => {
  return (
    <button className=" bg-white flex items-center gap-2 text-black p-2 rounded-sm ps-4 pr-4 cursor-pointer hover:bg-gray-100">
      <IoCartSharp /> bookStore
    </button>
  );
};

export default BookStore;
