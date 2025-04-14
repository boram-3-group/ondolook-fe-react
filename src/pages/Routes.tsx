import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './HomePage';
import { DefaultLayout } from './Layouts/DefaultLayout';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AccountForm from './SignupPage/AccountForm';
import ProfileForm from './SignupPage/ProfileForm';
import Welcome from './SignupPage/Welcome';

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
    path: '/signup/accountform',
    element: <DefaultLayout />,
    children: [{ path: '', element: <AccountForm /> }],
  },
  {
    path: '/signup/profileform',
    element: <DefaultLayout />,
    children: [{ path: '', element: <ProfileForm /> }],
  },
  {
    path: '/signup/welcome',
    element: <DefaultLayout />,
    children: [{ path: '', element: <Welcome /> }],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace={true} />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
