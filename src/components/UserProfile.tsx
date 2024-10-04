import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { Pin, User } from '../utils/types';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles =
  'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';
const UserProfile = () => {
  const [user, setUser] = useState<User>();
  const [Pins, setPins] = useState<Pin[]>([]);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();
  const [randomImageUrl, setRandomImageUrl] = useState('');

  const ImageUrl = `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;

  useEffect(() => {
    //fetch user info
    const query = userQuery(userId as string);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    //fetch random image
    fetch(ImageUrl).then((response) => {
      response.json().then((data) => {
        setRandomImageUrl(data.urls.full as string);
        //console.log(data);
      });
    });
  });
  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId as string);
      client.fetch(createdPinsQuery).then((data) => setPins(data));
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId as string);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);
  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/login');
  };
  if (!user) {
    return <Spinner message="Loading profile" />;
  }
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImageUrl}
              className="w-full h-370 xl:h-510 shadow-lg object-cover rounded-md"
              alt="banner-pic"
            />
            <img
              src={user.image}
              alt="user-profile"
              className="rounded-full w-20 h-20 -mt-10 shadow-md object-cover"
            />
            <h1 className="font-bold text-center mt-3 text-3xl">{user.userName}</h1>
            <div className="absolute top-0 z-1 right-0">
              {userId === user._id && (
                <button
                  onClick={logout}
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md "
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.currentTarget.textContent as string);
                setActiveBtn('created');
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.currentTarget.textContent as string);
                setActiveBtn('saved');
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
          {Pins?.length > 0 ? (
            <div className="px-2">
              <MasonryLayout pins={Pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Pins Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
