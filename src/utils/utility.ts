import { jwtDecode } from 'jwt-decode';
import { client } from '../client';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router-dom';
import { State, Action } from './types';
export const createOrGetUser = (response: any, navigate: NavigateFunction) => {
  const decode: { name: string; sub: string; picture: string } = jwtDecode(response.credential);
  const { name, sub, picture } = decode;
  localStorage.setItem('user', JSON.stringify(decode));
  const userDoc = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  client.createIfNotExists(userDoc).then(() => {
    navigate('/', { replace: true });
  });
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'search':
      return { ...state, searchTerm: action.searchTerm };
    case 'authenticated':
      return { ...state, user: action.user };
    case 'loading':
      return { ...state, loading: true };
    case 'loaded':
      return { ...state, loading: false };
  }
};
