import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';

const Header = () => {

    const { userData } = useContext(AppContent);

    return (
        <div className='flex flex-col items-center mt-32 px-8 sm:px-16 py-8 sm:py-12 text-center text-white bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900'>
            <img src={assets.header_img} alt="" className='w-40 h-40 sm:w-48 sm:h-48 rounded-full mb-8' />

            <h1 className='flex items-center gap-2 text-2xl sm:text-3xl font-medium mb-4 text-white'>
                Hey {userData ? userData.name : 'Coders'}!
                <img src={assets.hand_wave} alt="" className='w-8 sm:w-10 aspect-square' />
            </h1>

            <h2 className='text-3xl sm:text-5xl font-semibold mb-4 text-white'>
                Welcome to my Authentication System...
            </h2>

            <p className='mb-8 max-w-xl mx-4 text-gray-400'>
                Let's see how this goes... I hope you like it!
            </p>

            <button className='border border-teal-600 rounded-full px-8 py-3 text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-800 transition-all duration-300 transform hover:scale-105'>
                Get Started
            </button>
        </div>
    );
}

export default Header;
