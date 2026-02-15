import { useState, useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { FaHome } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { FaNewspaper } from "react-icons/fa6";
import { FaCircleInfo } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import BookStore from "./buttons/BookStore";
import { useNavigate } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setOpen(!open);
    console.log("Hello");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // when screen becomes small again → show icon
        setShowMenuIcon(true);
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-blue-900 text-white p-4 fixed top-0 left-0 right-0 z-50  ">
        <ul className="flex justify-between items-center max-w-7xl mx-auto px-4">
          {/* Logo */}
          <li
            className="text-3xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Krishna Prasad Poudel
          </li>

          {/* Mobile Menu Button */}
          {showMenuIcon && (
            <li className="min-[1100px]:hidden">
              <button onClick={handleMenuClick}>
                <TiThMenu
                  size={34}
                  className="transition-transform duration-300"
                />
              </button>
            </li>
          )}

          {/* Desktop Menu */}
          <li className="hidden min-[1100px]:block">
            <ul className="flex gap-10 text-lg">
              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => navigate("/about")}
              >
                About
              </li>
              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => navigate("/events")}
              >
                Events
              </li>
              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => navigate("/news")}
              >
                Latest News
              </li>
              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => navigate("/contact")}
              >
                Contact
              </li>
              <li
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => navigate("/youtube")}
              >
                Youtube
              </li>
            </ul>
          </li>

          {/* CTA / Book */}
          <li className="hidden  min-[1100px]:block">
            <ul className="flex gap-2">
              <li onClick={() => navigate("/books")}>
                <BookStore />
              </li>
              {/* <li
                className="hidden  min-[900px]:block"
                onClick={() => navigate("/admin-home")}
              >
                <AdminButton />
              </li> */}
            </ul>
          </li>
        </ul>
      </div>

      {/* Sliding nav content */}
      <div
        className={`fixed top-18 left-0 right-0 bg-blue-800 text-white transition-all duration-300 overflow-hidden z-40 ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4">
          <li
            className="cursor-pointer hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <FaHome size={17} /> Home
          </li>
          <li
            className="cursor-pointer hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate("/about")}
          >
            <FaCircleInfo size={17} /> About
          </li>
          <li
            className="cursor-pointer hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate("/events")}
          >
            <MdEventAvailable size={19} /> Events
          </li>
          <li
            className="cursor-pointer hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate("/news")}
          >
            <FaNewspaper size={17} /> Latest news
          </li>
          <li
            className="cursor-pointer hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate("/contact")}
          >
            <BiSolidContact size={17} /> Contact
          </li>
          <li
            className="cursor-pointer hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate("/youtube")}
          >
            <FaYoutube size={17} /> Youtube
          </li>
          <li
            className="cursor-pointer hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate("/books")}
          >
            <IoBookSharp size={17} /> Book
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
