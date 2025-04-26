import { createBrowserRouter, Navigate, RouterProvider, RouteObject } from 'react-router-dom';
import { HomePage } from './HomePage';
import { DefaultLayout } from './Layouts/DefaultLayout';
import { EmptyLayout } from './Layouts/EmptyLayout';
import { OnBoardPage } from './OnBoardPage';
import { MyPage } from './MyPage';
import { OauthCallbackPage } from './OnBoardPage/OauthCallbackPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Bookmark from './MyPage/pages/Bookmark';

type RouteWithHandle = RouteObject & {
  handle?: {
    title: string;
    isShowBack?: boolean;
    isShowForward?: boolean;
  };
};

export const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomePage />,
    children: [{ path: '', element: <HomePage /> }],
  } as RouteWithHandle,
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
  } as RouteWithHandle,
  {
    path: '/signup',
    element: <DefaultLayout />,
    children: [{ path: '', element: <SignupPage /> }],
  } as RouteWithHandle,
  {
    path: '/my',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <MyPage />,
        handle: {
          title: '마이페이지',
        },
      } as RouteWithHandle,
      {
        path: 'bookmark',
        element: <Bookmark />,
        handle: {
          title: '북마크',
          isShowBack: true,
          isShowForward: true,
        },
      } as RouteWithHandle,
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace={true} />,
  } as RouteWithHandle,
] as RouteWithHandle[]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
