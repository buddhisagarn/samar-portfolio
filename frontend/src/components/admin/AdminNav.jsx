import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { FaHome, FaNewspaper } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BookAIcon } from "lucide-react";

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, path: "/admin-home" },
    { label: "About", icon: <FaCircleInfo />, path: "/admin-about" },
    { label: "Events", icon: <MdEventAvailable />, path: "/admin-event" },
    { label: "News", icon: <FaNewspaper />, path: "/admin-news" },
    { label: "Contact", icon: <BiSolidContact />, path: "/admin-contact" },
    { label: "Book", icon: <BookAIcon />, path: "/admin-book" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-900 text-white p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        <TiThMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-blue-900 text-white 
        transition-all duration-300 z-40
        ${open ? "w-64" : "w-0 md:w-64"}
        overflow-hidden`}
      >
        {/* Logo */}
        <div
          className="text-2xl font-bold p-5 cursor-pointer border-b border-blue-700"
          onClick={() => navigate("/admin-home")}
        >
          Admin Panel
        </div>

        {/* Menu */}
        <ul className="flex flex-col mt-4 gap-1">
          {menuItems.map((item, i) => (
            <li
              key={i}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-4 px-6 py-3 
              hover:bg-blue-700 cursor-pointer transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
