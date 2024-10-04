import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components';
import { User } from '../utils/types';
import { Outlet } from 'react-router-dom';
const Pins = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar />
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Pins;
