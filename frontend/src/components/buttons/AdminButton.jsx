import React from "react";
import { RiAdminFill } from "react-icons/ri";

const AdminButton = () => {
  return (
    <button className=" bg-blue flex items-center gap-2 text-white p-2 rounded-sm ps-4 pr-4 cursor-pointer border border-white">
      <RiAdminFill /> Admin
    </button>
  );
};

export default AdminButton;
