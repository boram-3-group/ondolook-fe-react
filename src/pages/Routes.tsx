import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './HomePage';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <Navigate to="/home" replace={true} />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
