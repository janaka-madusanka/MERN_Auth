import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedin, userData]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 px-4'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

      <form onSubmit={onSubmitHandler} className='bg-gray-800 bg-opacity-90 p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-md space-y-6'>
        <h1 className='text-white text-2xl sm:text-3xl font-bold text-center mb-2'>Email Verification</h1>
        <p className='text-center text-gray-400 text-sm sm:text-lg mb-4'>Enter the 6-digit code sent to your email address.</p>

        <div className='flex justify-center gap-2 sm:gap-4' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength='1'
              key={index}
              required
              className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 text-white text-center text-xl sm:text-2xl rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button className='w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-teal-800 transition-all duration-200'>
          Verify Email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify;
