import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Track dropdown visibility
  const timeoutRef = useRef(null); // Reference for timeout
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = React.useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        toast.success(data.message);
        navigate('/email-verify');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle mouse enter to show the dropdown
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // Clear any pending timeouts
    setIsDropdownVisible(true); // Show the dropdown immediately
  };

  // Handle mouse leave to hide the dropdown after a delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownVisible(false); // Hide the dropdown after a delay
    }, 300); // Set the delay time (in milliseconds)
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 fixed top-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white shadow-md z-50">
      <img src={assets.logo} alt="Logo" className="w-12 sm:w-16" />

      {userData ? (
        <div
          className="relative"
          onMouseEnter={handleMouseEnter} // Show dropdown when hovered
          onMouseLeave={handleMouseLeave} // Hide dropdown with delay when mouse leaves
        >
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[#333A5C] text-white cursor-pointer">
            {userData.name[0].toUpperCase()}
          </div>

          {/* Dropdown menu */}
          {isDropdownVisible && (
            <div className="absolute top-12 right-0 z-30 text-black rounded shadow-lg w-40">
              <ul className="list-none m-0 p-2 bg-white text-sm rounded-lg">
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded-md transition-all"
                  >
                    Verify Email
                  </li>
                )}
                <li
                  onClick={logout}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded-md transition-all"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-white rounded-full px-6 py-2 text-white bg-transparent hover:bg-gray-100 hover:text-black transition-all"
        >
          Login <img src={assets.arrow_icon} alt="Arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
