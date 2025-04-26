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
type RouteWithMeta = RouteObject & {
  meta?: {
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
    children: [{ path: '', element: <SignupPage /> }],
  } as RouteWithMeta,
  {
    path: '/my',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <MyPage />,
        meta: {
          title: '마이페이지',
        },
      } as RouteWithMeta,
      {
        path: 'bookmark',
        element: <Bookmark />,
        meta: {
          title: '북마크',
          isShowBack: true,
          isShowForward: true,
        },
      } as RouteWithMeta,
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace={true} />,
  } as RouteWithMeta,
] as RouteWithMeta[]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
