import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './HomePage';
import { DefaultLayout } from './Layouts/DefaultLayout';
import { EmptyLayout } from './Layouts/EmptyLayout';
import { OnBoardPage } from './OnBoardPage';
import { OauthCallbackPage } from './OnBoardPage/OauthCallbackPage';

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <DefaultLayout />,
    children: [{ path: '', element: <HomePage /> }],
  },
  {
    path: '/login',
    element: <EmptyLayout />,
    children: [
      { path: '', element: <OnBoardPage /> },
      { path: 'form', element: <LoginPage /> },
      { path: 'oauth-callback', element: <OauthCallbackPage /> },
    ],
  },
  {
    path: '/signup',
    element: <DefaultLayout />,
    children: [{ path: '', element: <SignupPage /> }],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace={true} />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
