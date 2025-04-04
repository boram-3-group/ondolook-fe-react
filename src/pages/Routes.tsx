import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './HomePage';
import { DefaultLayout } from './Layouts/DefaultLayout';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <DefaultLayout />,
    children: [{ path: '', element: <HomePage /> }],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace={true} />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
