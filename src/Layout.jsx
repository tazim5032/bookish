import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <Navbar />
    </div>
  );
}

export default Layout;
