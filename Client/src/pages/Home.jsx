import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen 
      bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 relative text-white">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/bg_img.png')] bg-cover bg-center opacity-10"></div>

      {/* Navbar at the Top */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center mt-16">
        <Header />
      </div>

    </div>
  );
}

export default Home;
