import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './HomePage';
import { DefaultLayout } from './Layouts/DefaultLayout';
import LoginPage from './LoginPage';
import SignupPage from './SignupPaget';


const router = createBrowserRouter([
  {
    path: '/home',
    element: <DefaultLayout />,
    children: [{ path: '', element: <HomePage /> }],
  },
  {
    path: '/login',
    element: <DefaultLayout />,
    children: [{ path: '', element: <LoginPage /> }],
  },
  {
    path: '/signup',
    element: <DefaultLayout />,
    children: [{ path: '', element: <SignupPage /> }],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace={true} />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
