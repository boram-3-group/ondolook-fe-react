import { createBrowserRouter, Navigate, RouterProvider, RouteObject } from 'react-router-dom';
import { HomePage } from './HomePage';
import { DefaultLayout } from './Layouts/DefaultLayout';
import { EmptyLayout } from './Layouts/EmptyLayout';
import { OnBoardPage } from './OnBoardPage';
import { MyPage } from './MyPage';
import { OauthCallbackPage } from './OnBoardPage/OauthCallbackPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import FindIdPage from './FindIdPage';
import FindIdSuccess from './FindIdPage/FindIdSuccess';
import ResetPasswordPage from './ResetPasswordPage';
import NewPassword from './ResetPasswordPage/NewPassword';
import ResetSuccess from './ResetPasswordPage/ResetSuccess';
import { AgreedToTerms } from './SignupPage/AgreedToTerms';
import { AgreedToPrivacy } from './SignupPage/AgreedToPrivacy';

type RouteWithMeta = RouteObject & {
  meta?: {
    title: string;
  };
};

export const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomePage />,
    children: [{ path: '', element: <HomePage /> }],
  } as RouteWithMeta,
  {
    path: '/login',
    element: <EmptyLayout />,
    children: [
      {
        path: '',
        element: <OnBoardPage />,
      },
      { path: 'form', element: <LoginPage /> },
      { path: 'oauth-callback', element: <OauthCallbackPage /> },
    ],
  } as RouteWithMeta,
  {
    path: '/signup',
    element: <DefaultLayout />,
    children: [
      { path: '', element: <SignupPage /> },
      { path: 'agreedToTerms', element: <AgreedToTerms /> },
      { path: 'agreedToPrivacy', element: <AgreedToPrivacy /> },
    ],
  } as RouteWithMeta,
  {
    path: '/find-id',
    element: <DefaultLayout />,
    children: [
      { path: '', element: <FindIdPage /> },
      { path: 'success', element: <FindIdSuccess /> },
    ],
  } as RouteWithMeta,
  {
    path: '/reset-password',
    element: <DefaultLayout />,
    children: [
      { path: '', element: <ResetPasswordPage /> },
      { path: 'newpassword', element: <NewPassword /> },
      { path: 'success', element: <ResetSuccess /> },
    ],
  } as RouteWithMeta,
  {
    path: '/my',
    element: <DefaultLayout />,
    children: [{ path: '', element: <MyPage /> }],
    meta: {
      title: '마이페이지',
    },
  } as RouteWithMeta,
  {
    path: '*',
    element: <Navigate to="/login" replace={true} />,
  } as RouteWithMeta,
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
