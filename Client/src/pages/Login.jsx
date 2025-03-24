import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {

        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else { toast.error(data.message); }

      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else { toast.error(data.message); }

      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900'>

      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-20 sm:w-24 cursor-pointer' />

      <div className='bg-gray-800 p-12 rounded-2xl shadow-xl w-full sm:w-96 text-white'>

        <h2 className='text-3xl font-semibold text-center mb-4 text-white'>{state === 'Sign Up' ? 'Create an Account' : 'Login'}</h2>

        <p className='text-center text-lg mb-6 text-gray-400'>{state === 'Sign Up' ? 'Create your account to get started' : 'Login to access your account'}</p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-gray-600'>
              <img src={assets.person_icon} alt="" className='w-5 h-5' />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className='bg-transparent outline-none text-white placeholder-gray-300' type="text" placeholder="Full Name" required />
            </div>
          )}

          <div className='mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-gray-600'>
            <img src={assets.mail_icon} alt="" className='w-5 h-5' />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className='bg-transparent outline-none text-white placeholder-gray-300' type="email" placeholder="Email Address" required />
          </div>

          <div className='mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-gray-600'>
            <img src={assets.lock_icon} alt="" className='w-5 h-5' />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className='bg-transparent outline-none text-white placeholder-gray-300' type="password" placeholder="Password" required />
          </div>

          <p onClick={() => navigate('/reset-password')} className='text-center mb-4 text-indigo-300 cursor-pointer'>Forgot password?</p>

          <button className='w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white text-lg font-medium hover:bg-teal-800 transition-all duration-200'>
            {state}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className='text-center text-indigo-300 text-xs mt-4'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='cursor-pointer underline text-indigo-200'>Login here</span>
          </p>
        ) : (
          <p className='text-center text-indigo-300 text-xs mt-4'>
            Don't have an account?{' '}
            <span onClick={() => setState('Sign Up')} className='cursor-pointer underline text-indigo-200'>Sign up</span>
          </p>
        )}

      </div>

    </div>
  )
}

export default Login;
