import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, LayoutDashboard, Code, FileText, Info, MessageSquare } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import authservice from '../AppwriteService/authservice';
import { logout } from "../Redux_STORE/Reducers";

function Navbar() {
  const LoginStatus = useSelector((state) => state.LogInStatus);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    let data = await authservice.LogoutAsAdmin();
    if (data.success) {
      console.log("Logout successful");
      dispatch(logout());
    } else {
      console.log(data.error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 w-full">
      <div className="container mx-auto flex justify-evenly items-center">
        {/* Logo or Home Link */}
        <Link to="/" className="text-2xl font-bold flex items-center whitespace-nowrap">
          My Portfolio Admin
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute top-16 left-0 w-full bg-gray-900 p-4 md:static md:flex md:items-center md:space-x-6 ${
            isMenuOpen ? 'block' : 'hidden'
          } md:block`}
        >
          {LoginStatus ? (
            <>
              <Link to="/" className="py-2 md:py-0 flex items-center hover:text-gray-400 whitespace-nowrap">
                <LayoutDashboard className="mr-2" />
                Dashboard
              </Link>
              <Link to="/manage-projects" className="py-2 md:py-0 flex items-center hover:text-gray-400 whitespace-nowrap">
                <FileText className="mr-2" />
                Manage Projects
              </Link>
              <Link to="/manage-about" className="py-2 md:py-0 flex items-center hover:text-gray-400 whitespace-nowrap">
                <Info className="mr-2" />
                Manage About
              </Link>
              <Link to="/manage-skills" className="py-2 md:py-0 flex items-center hover:text-gray-400 whitespace-nowrap">
                <Code className="mr-2" />
                Manage Skills
              </Link>
              <Link to="/view-messages" className="py-2 md:py-0 flex items-center hover:text-gray-400 whitespace-nowrap">
                <MessageSquare className="mr-2" />
                View Messages
              </Link>
              <button
                className="py-2 md:py-0 flex items-center hover:text-gray-400 focus:outline-none whitespace-nowrap"
                onClick={handleLogout}
              >
                <LogOut className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="py-2 md:py-0 flex items-center hover:text-gray-400 whitespace-nowrap">
              <LogIn className="mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
