import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm px-4 md:px-8 py-4">
        <div className="flex justify-end gap-5 mb-5 items-center">
        <Link to="/help" className="text-sm hidden md:inline hover:text-gray-600">Help</Link>
          <Link to="/orders" className="text-sm hidden md:inline hover:text-gray-600">Orders & Returns</Link>
          <Link to="/profile" className="text-sm hidden md:inline hover:text-gray-600">Hi, John</Link>

         
        </div>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">ECOMMERCE</Link>
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-semibold text-gray-800">
          <Link to="/product-page" className="hover:text-gray-600">Categories</Link>
          <Link to="/product-page" className="hover:text-gray-600">Sale</Link>
          <Link to="/product-page" className="hover:text-gray-600">Clearance</Link>
          <Link to="/product-page" className="hover:text-gray-600">New stock</Link>
          <Link to="/product-page" className="hover:text-gray-600">Trending</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
         
          <div className="flex items-center space-x-4">
            <FaSearch className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <FaShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="mt-4 w-full flex justify-center items-center text-sm font-semibold text-gray-700 bg-gray-100 py-2 rounded">
        <button className="px-2">&#9664;</button>
        <span>Get 10% off on business sign up</span>
        <button className="px-2">&#9654;</button>
      </div>
    </header>
  );
};

export default Navbar;
