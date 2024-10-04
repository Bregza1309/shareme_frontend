import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, UserProfile, PinDetail, Search, Feed, CreatePin } from './components';
import Home from './container/Home';
import Pins from './container/Pins';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Pins />,
        children: [
          { path: '/', element: <Feed />, children: [{ path: '/category/:categoryId' }] },
          { path: '/pin-detail/:pinId', element: <PinDetail /> },
          { path: '/search', element: <Search /> },
          { path: '/create-pin', element: <CreatePin /> },
        ],
      },
      {
        path: '/user-profile/:userId',
        element: <UserProfile />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};
export default Routes;
