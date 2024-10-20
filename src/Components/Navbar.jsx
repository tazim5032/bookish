import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-3xl font-bold cursor-pointer">
          <Link to="/">Bookish</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/books" className="hover:text-gray-300">
            Books
          </Link>
          <Link to="/wishList" className="hover:text-gray-300">
            WishList
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 text-center py-4 space-y-4">
          <Link to="/" className="block text-lg hover:text-gray-300">
            Home
          </Link>
          <Link to="/books" className="block text-lg hover:text-gray-300">
            Books
          </Link>
          <Link to="/wishList" className="block text-lg hover:text-gray-300">
            WishList
          </Link>
          {/* <div className="px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full px-4 py-2 rounded-full bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
              <button className="absolute right-3 top-2 text-gray-600">
                <FaSearch />
              </button>
            </div>
          </div> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
