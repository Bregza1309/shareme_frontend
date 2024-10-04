import React, { useState, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components';
import { client } from '../client';
import logo from '../assets/logo.png';
import { userQuery } from '../utils/data';
import { AssertIsUser } from '../utils/types';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch } = useAppContext();
  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') as string)
      : localStorage.clear();

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login');
    } else {
      const query = userQuery(userInfo?.sub);
      client.fetch(query).then((data) => {
        let userData = data[0];
        userData.image = userInfo?.picture as string;
        //setUser(userData);
        dispatch({ type: 'authenticated', user: userData });
      });
    }
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-28" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <div>
              <Sidebar closeToggle={() => setToggleSidebar(false)} />
            </div>
          </div>
        )}
      </div>
      <div className="p-2 flex-1 h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
